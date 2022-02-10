'use strict';

const debug = require('debug')('sentencecollector:sentences');
const { QueryTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize, Sentence } = require('./models');
const { FALLBACK_LOCALE } = require('./languages');
const { validateSentences } = require('./validation');
const votes = require('./votes');

const DUPLICATE_ERROR = 1062;

module.exports = {
  getSentencesForLocale,
  getApprovedSentencesForLocale,
  getUndecidedSentencesForLocale,
  getRejectedSentencesForLocale,
  getSentencesForReview,
  getRejectedSentences,
  getMySentences,
  deleteMySentences,
  getStats,
  getAllStatsForLocale,
  getUserAddedSentencesPerLocale,
  getUnreviewedByYouCountForLocales,
  addSentences,
};

async function getSentencesForLocale({ localeId, source, batch, sentence }) {
  debug('GETTING_SENTENCES_FOR_LOCALE', localeId);
  const options = {
    attributes: { exclude: ['userId'] },
    order: [['createdAt', 'DESC']],
    where: {
      localeId,
    }
  };

  if (sentence) {
    options.where.sentence = sentence;
  }

  if (source) {
    options.where.source = source;
  }

  if (batch) {
    options.where.batch = batch;
  }

  return Sentence.findAll(options);
}

function getApprovedSentencesForLocale(locale) {
  const validatedSentencesQuery = getValidatedSentencesQuery();
  return sequelize.query(validatedSentencesQuery, { replacements: [locale], type: QueryTypes.SELECT });
}

function getUndecidedSentencesForLocale(locale) {
  const undecidedSentencesQuery = getUndecidedSentencesQuery();
  return sequelize.query(undecidedSentencesQuery, { replacements: [locale], type: QueryTypes.SELECT });
}

function getRejectedSentencesForLocale(locale) {
  const rejectedSentencesQuery = getRejectedSentencesQuery({ locale });
  return sequelize.query(rejectedSentencesQuery, { replacements: [locale], type: QueryTypes.SELECT });
}

async function getSentencesForReview({ locale, userId }) {
  debug('GETTING_SENTENCES_FOR_LOCALE', locale);

  const query = getReviewQuery();
  const limittedQuery = `
    ${query}
    LIMIT 1000
  `;
  const sentences = await sequelize.query(limittedQuery, { replacements: [locale, userId], type: QueryTypes.SELECT });
  return sentences;
}

async function getRejectedSentences({ userId }) {
  debug('GETTING_REJECTED_SENTENCES');

  const query = getRejectedSentencesQuery({ userId });
  const sentences = await sequelize.query(query, { replacements: [userId], type: QueryTypes.SELECT });
  const sentencesPerLocale = sentences.reduce((perLocale, sentenceInfo) => {
    perLocale[sentenceInfo.localeId] = perLocale[sentenceInfo.localeId] || [];
    perLocale[sentenceInfo.localeId].push(sentenceInfo);
    return perLocale;
  }, {});
  return sentencesPerLocale;
}

async function getMySentences({ userId }) {
  debug('GETTING_MY_SENTENCES');

  const options = {
    where: {
      userId,
    },
  };

  const sentences = await Sentence.findAll(options);

  const sentencesPerLocale = sentences.reduce((perLocale, sentenceInfo) => {
    perLocale[sentenceInfo.localeId] = perLocale[sentenceInfo.localeId] || {};

    const batch = sentenceInfo.batch || 0;
    perLocale[sentenceInfo.localeId][batch] = perLocale[sentenceInfo.localeId][batch] || {
      source: sentenceInfo.source,
      sentences: []
    };
    perLocale[sentenceInfo.localeId][batch].sentences.push(sentenceInfo);

    return perLocale;
  }, {});

  return sentencesPerLocale;
}

async function deleteMySentences({ userId, sentenceIds }) {
  debug('DELETING_MY_SENTENCES');

  const options = {
    where: {
      id: sentenceIds,
      // Passing the userId here as well makes sure that sentences that
      // do not belong to this user would silently be ignored.
      userId,
    },
  };

  await Sentence.destroy(options);
}

async function getStats(locales) {
  debug('GETTING_STATS');

  const totalStats = {};
  for (const locale of locales) {
    const options = {
      where: {
        localeId: locale,
      },
    };

    const [validated, rejected, added] = await Promise.all([
      getValidatedSentencesCountForLocale(locale),
      getRejectedSentencesCountForLocale(locale),
      Sentence.count(options),
    ]);
    totalStats[locale] = {
      added,
      validated,
      rejected,
    };
  }

  return {
    all: totalStats,
    totals: {
      total: await Sentence.count(),
      languages: await Sentence.count({ distinct: true, col: 'localeId'}),
    }
  };
}

async function getAllStatsForLocale(locale) {
  debug('GETTING_STATS_FOR_LOCALE');

  const [validated, rejected, added, contributors] = await Promise.all([
    getValidatedSentencesCountForLocale(locale),
    getRejectedSentencesCountForLocale(locale),
    Sentence.count({ where: { localeId: locale }}),
    Sentence.count({ distinct: true, col: 'userId', where: { localeId: locale }}),
  ]);

  return {
    validated,
    rejected,
    added,
    contributors,
  };
}

async function getValidatedSentencesCountForLocale(locale) {
  const validatedSentencesQuery = getValidatedSentencesQuery();
  const query = `
    SELECT COUNT(*) FROM
      (${validatedSentencesQuery}) as approved_sentences;
  `;

  const queryResult = await sequelize.query(query, { replacements: [locale], type: QueryTypes.SELECT });
  const validatedCount = queryResult[0] && queryResult[0]['COUNT(*)'];
  return validatedCount;
}

async function getUnreviewedByYouCountForLocales(locales, userId) {
  const stats = {};

  for await (const locale of locales) {
    const reviewQuery = getReviewQuery();
    const query = `
      SELECT COUNT(*) FROM
        (${reviewQuery}) as approved_sentences;
    `;

    const queryResult = await sequelize.query(query, { replacements: [locale, userId], type: QueryTypes.SELECT });
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

  const queryResult = await sequelize.query(query, { replacements: [locale], type: QueryTypes.SELECT });
  const rejectedCount = queryResult[0] && queryResult[0]['COUNT(*)'];
  return rejectedCount;
}

async function getUserAddedSentencesPerLocale(locales, userId) {
  debug('GETTING_USER_ADDED_STATS');
  const addedStats = {};

  for (const locale of locales) {
    const options = {
      attributes: ['localeId'],
      where: {
        userId,
        localeId: locale,
      },
    };
    addedStats[locale] = await Sentence.count(options);
  }

  return addedStats;
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

function getReviewQuery() {
  return `
    SELECT
      Sentences.id,
      Sentences.sentence,
      Sentences.source,
      Sentences.localeId,
      SUM(Votes.approval) as number_of_approving_votes,
      COUNT(Votes.approval) as number_of_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    WHERE Sentences.localeId = ?
      AND NOT EXISTS (SELECT *
        FROM Votes
        WHERE Sentences.id = Votes.sentenceId AND Votes.userId = ?)
    GROUP BY Sentences.id
    HAVING
      number_of_votes < 2 OR # not enough votes yet
      number_of_votes = 2 AND number_of_approving_votes = 1 # a tie at one each
    ORDER BY number_of_votes DESC`;
}

// This is very similar to the Review Query, but without user. This could be incorporated
// with the query above, but that would make it vastly more complicated.
function getUndecidedSentencesQuery() {
  return `
    SELECT
      Sentences.sentence,
      SUM(Votes.approval) as number_of_approving_votes,
      COUNT(Votes.approval) as number_of_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    WHERE Sentences.localeId = ?
    GROUP BY Sentences.id
    HAVING
      number_of_votes < 2 OR # not enough votes yet
      number_of_votes = 2 AND number_of_approving_votes = 1 # a tie at one each
    ORDER BY number_of_votes DESC`;
}

function getValidatedSentencesQuery() {
  return `
    SELECT
      Sentences.id,
      Sentences.sentence,
      SUM(Votes.approval) as number_of_approving_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId = Sentences.id)
    WHERE Sentences.localeId = ?
    GROUP BY Sentences.id
    HAVING
      number_of_approving_votes >= 2`;
}

function getRejectedSentencesQuery({ userId, locale }) {
  let whereClause = '';

  if (typeof userId !== 'undefined') {
    whereClause = `WHERE Sentences.userId = ?`;
  }

  if (locale) {
    whereClause = whereClause ?
      `${whereClause} and Sentences.localeId = ?` :
      `WHERE Sentences.localeId = ?`;
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