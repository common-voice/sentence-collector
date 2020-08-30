'use strict';

const debug = require('debug')('sentencecollector:sentences');
const { QueryTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize, Sentence, Vote } = require('./models');
const { FALLBACK_LOCALE } = require('./languages');
const { validateSentences } = require('./validation');
const votes = require('./votes');

const DUPLICATE_ERROR = 1062;

module.exports = {
  getSentencesForLocale,
  getApprovedSentencesForLocale,
  getSentencesForReview,
  getRejectedSentences,
  getStats,
  getUserAddedSentencesPerLocale,
  getUnreviewedByYouCountForLocales,
  addSentences,
};

async function getSentencesForLocale(localeId, sentenceFilter) {
  debug('GETTING_SENTENCES_FOR_LOCALE', localeId);
  const options = {
    order: [['createdAt', 'DESC']],
    where: {
      localeId,
    }
  };

  if (sentenceFilter) {
    options.where.sentence = sentenceFilter;
  }

  return Sentence.findAll(options);
}

function getApprovedSentencesForLocale(locale) {
  const validatedSentencesQuery = getValidatedSentencesQuery({ locale });
  return sequelize.query(validatedSentencesQuery, { type: QueryTypes.SELECT });
}

async function getSentencesForReview({ locale, userId }) {
  debug('GETTING_SENTENCES_FOR_LOCALE', locale);

  const query = getReviewQuery({ locale, userId });
  const limittedQuery = `
    ${query}
    LIMIT 1000
  `;
  const sentences = await sequelize.query(limittedQuery, { type: QueryTypes.SELECT });
  return sentences;
}

async function getRejectedSentences({ userId }) {
  debug('GETTING_REJECTED_SENTENCES');

  const query = getRejectedSentencesQuery({ userId });
  const sentences = await sequelize.query(query, { type: QueryTypes.SELECT });
  const sentencesPerLocale = sentences.reduce((perLocale, sentenceInfo) => {
    perLocale[sentenceInfo.localeId] = perLocale[sentenceInfo.localeId] || [];
    perLocale[sentenceInfo.localeId].push(sentenceInfo);
    return perLocale;
  }, {});
  return sentencesPerLocale;
}

async function getStats(locales) {
  debug('GETTING_STATS');

  const totalStats = {};
  for (const locale of locales) {
    const validated = await getValidatedSentencesCountForLocale(locale);
    const rejected = await getRejectedSentencesCountForLocale(locale);

    const options = {
      where: {
        localeId: locale,
      },
    };
    const sentenceTotalCountByLocale = await Sentence.count(options);
    totalStats[locale] = {
      added: sentenceTotalCountByLocale,
      validated,
      rejected,
    };
  }

  return {
    ...totalStats,
    total: await Sentence.count(),
    languages: await Sentence.count({ distinct: true, col: 'localeId'}),
  };
}

async function getValidatedSentencesCountForLocale(locale) {
  const validatedSentencesQuery = getValidatedSentencesQuery({ locale });
  const query = `
    SELECT COUNT(*) FROM
      (${validatedSentencesQuery}) as approved_sentences;
  `;

  const queryResult = await sequelize.query(query, { type: QueryTypes.SELECT });
  const validatedCount = queryResult[0] && queryResult[0]['COUNT(*)'];
  return validatedCount;
}

async function getUnreviewedByYouCountForLocales(locales, userId) {
  const stats = {};

  for await (const locale of locales) {
    const reviewQuery = getReviewQuery({ locale, userId });
    const query = `
      SELECT COUNT(*) FROM
        (${reviewQuery}) as approved_sentences;
    `;

    const queryResult = await sequelize.query(query, { type: QueryTypes.SELECT });
    stats[locale] = queryResult[0] && queryResult[0]['COUNT(*)'];
  }

  return stats;
}

async function getRejectedSentencesCountForLocale(locale) {
  const rejectedQuery = getRejectedSentencesQuery({ locale });
  const query = `
    SELECT COUNT(*) FROM
      (${rejectedQuery}) as rejected_sentences;
  `;

  const queryResult = await sequelize.query(query, { type: QueryTypes.SELECT });
  const rejectedCount = queryResult[0] && queryResult[0]['COUNT(*)'];
  return rejectedCount;
}

function calculateStats(stats, sentenceInfo) {
  const localeId = sentenceInfo.localeId;
  stats[localeId] = stats[localeId] || {
    added: 0,
    validated: 0,
  };

  stats[localeId].added++;

  const approvals = sentenceInfo.Vote.filter((vote) => vote.approval);
  const approved = approvals.length >= 2;
  if (approved) {
    stats[localeId].validated++;
  }

  return stats;
}

async function getUserAddedSentencesPerLocale(userId) {
  debug('GETTING_USER_ADDED_STATS');

  const options = {
    where: {
      userId,
    },
    include: [{
      model: Vote,
      as: 'Vote',
      attributes: ['approval'],
      required: false,
    }],
  };
  const sentences = await Sentence.findAll(options);
  const sentencesStats = sentences.reduce(calculateStats, {});

  return sentencesStats;
}

async function addSentences(data) {
  const {
    sentences,
    userId,
    source,
    locale = FALLBACK_LOCALE,
  } = data;

  const batch = uuidv4();

  const { valid, validValidated, filtered } = validateSentences(locale, sentences);

  debug('Creating database entries');
  let duplicateCounter = 0;

  const addSentenceToDatabase = (sentence, transaction, isValidated) => {
    const params = {
      sentence,
      userId,
      source,
      batch,
      localeId: locale,
    };

    return Sentence.create(params, { transaction })
      .then((sentence) => {
        if (!isValidated) {
          return sentence;
        }

        const voteParams = {
          sentenceId: sentence.id,
          userId,
          approval: true,
        };
        return votes.addVoteForSentence(voteParams, transaction);
      })
      .catch((error) => {
        if (error.parent && error.parent.errno === DUPLICATE_ERROR) {
          debug('Ignoring duplicate sentence', sentence);
          duplicateCounter++;
        }
      });
  };

  const transaction = await sequelize.transaction();
  const validPromises = valid.map((sentence) => addSentenceToDatabase(sentence, transaction, false));
  const validatedPromises = validValidated.map((sentence) => addSentenceToDatabase(sentence, transaction, true));

  await Promise.all([
    ...validPromises,
    ...validatedPromises,
  ]);

  await transaction.commit();

  return { errors: filtered, duplicates: duplicateCounter };
}

function getReviewQuery({ locale, userId }) {
  return `
    SELECT
      Sentences.id,
      Sentences.sentence,
      Sentences.localeId,
      SUM(Votes.approval) as number_of_approving_votes,
      COUNT(Votes.approval) as number_of_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    WHERE Sentences.localeId = "${locale}"
      AND NOT EXISTS (SELECT *
        FROM Votes
        WHERE Sentences.id = Votes.sentenceId AND Votes.userId = "${userId}")
    GROUP BY Sentences.id
    HAVING
      number_of_votes < 2 OR # not enough votes yet
      number_of_votes = 2 AND number_of_approving_votes = 1 # a tie at one each
    ORDER BY number_of_votes DESC`;
}

function getValidatedSentencesQuery({ locale }) {
  return `
    SELECT
      Sentences.id,
      Sentences.sentence,
      SUM(Votes.approval) as number_of_approving_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId = Sentences.id)
    WHERE Sentences.localeId = "${locale}"
    GROUP BY Sentences.id
    HAVING
      number_of_approving_votes >= 2`;
}

function getRejectedSentencesQuery({ userId, locale }) {
  let whereClause = '';

  if (typeof userId !== 'undefined') {
    whereClause = `WHERE Sentences.userId = '${userId}'`;
  }

  if (locale) {
    whereClause = whereClause ?
      `${whereClause} and Sentences.localeId = '${locale}'` :
      `WHERE Sentences.localeId = '${locale}'`;
  }

  return `
    SELECT
      Sentences.id,
      Sentences.sentence,
      Sentences.localeId,
      SUM(Votes.approval) as number_of_approving_votes,
      COUNT(Votes.approval) as number_of_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    ${whereClause}
    GROUP BY Sentences.id
    HAVING
      (
        number_of_votes = 3 AND
        number_of_approving_votes < 2
      ) OR (
        number_of_votes = 2 AND
        number_of_approving_votes = 0
      )
    ORDER BY Sentences.createdAt DESC`;
}