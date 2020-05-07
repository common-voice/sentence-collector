'use strict';

const debug = require('debug')('sentencecollector:sentences');
const { QueryTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize, Sentence, Locale, Vote } = require('./models');
const { FALLBACK_LOCALE } = require('./languages');
const { validateSentences } = require('./validation');
const { addVoteForSentence } = require('./votes');

const DUPLICATE_ERROR = 1062;

module.exports = {
  getSentencesForLocale,
  getSentencesForReview,
  getRejectedSentences,
  getStats,
  getUserAddedSentencesPerLocale,
  addSentences,
};

async function getSentencesForLocale(localeId) {
  debug('GETTING_SENTENCES_FOR_LOCALE', localeId);
  const options = {
    order: [['createdAt', 'DESC']],
    where: {
      localeId,
    }
  };

  return Sentence.findAll(options);
}

async function getSentencesForReview({ locale, user }) {
  debug('GETTING_SENTENCES_FOR_LOCALE', locale);

  const query = `
    SELECT
      Sentences.id,
      Sentences.sentence,
      Sentences.localeId,
      SUM(Votes.approval) as number_of_approving_votes,
      COUNT(Votes.approval) as number_of_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    WHERE NOT EXISTS (SELECT *
        FROM Votes
        WHERE Sentences.id = Votes.sentenceId AND Votes.user = "${user}")
    GROUP BY Sentences.id
    HAVING
      number_of_votes < 2 OR # not enough votes yet
      number_of_votes = 2 AND number_of_approving_votes = 1 # a tie at one each
    ORDER BY number_of_votes DESC;
  `;

  const sentences = await sequelize.query(query, { type: QueryTypes.SELECT });
  return sentences;
}

async function getRejectedSentences({ user }) {
  debug('GETTING_REJECTED_SENTENCES');

  const query = `
    SELECT
      Sentences.id,
      Sentences.sentence,
      Sentences.localeId,
      SUM(Votes.approval) as number_of_approving_votes,
      COUNT(Votes.approval) as number_of_votes
    FROM Sentences
    LEFT JOIN Votes ON (Votes.sentenceId=Sentences.id)
    WHERE Sentences.user = "${user}"
    GROUP BY Sentences.id
    HAVING
      (
        number_of_votes = 3 AND
        number_of_approving_votes < 2
      ) OR (
        number_of_votes = 2 AND
        number_of_approving_votes = 0
      )
    ORDER BY Sentences.createdAt DESC;
  `;

  const sentences = await sequelize.query(query, { type: QueryTypes.SELECT });
  const sentencesPerLocale = sentences.reduce((perLocale, sentenceInfo) => {
    perLocale[sentenceInfo.localeId] = perLocale[sentenceInfo.localeId] || [];
    perLocale[sentenceInfo.localeId].push(sentenceInfo);
    return perLocale;
  }, {});
  return sentencesPerLocale;
}

function calculateStats(stats, sentenceInfo) {
  const locale = sentenceInfo.Locale.name;
  stats[locale] = stats[locale] || {
    added: 0,
    validated: 0,
  };

  stats[locale].added++;

  const approvals = sentenceInfo.Vote.filter((vote) => vote.approval);
  const approved = approvals.length >= 2;
  if (approved) {
    stats[locale].validated++;
  }

  return stats;
}

async function getStats() {
  debug('GETTING_STATS');

  const options = {
    group: ['localeId'],
  };
  const sentenceTotalCountByLocale = await Sentence.count(options);

  const totalStats = sentenceTotalCountByLocale.reduce((stats, countInfo) => {
    stats[countInfo.localeId] = {
      added: countInfo.count,

      // TODO: How do we best count validated by locale? For now this is a regression
      validated: -1,
    };
    return stats;
  }, {});

  return {
    ...totalStats,
    total: await Sentence.count(),
    languages: await Sentence.count({ distinct: true, col: 'localeId'}),
  };
}

async function getUserAddedSentencesPerLocale(user) {
  debug('GETTING_USER_ADDED_STATS');

  const options = {
    attributes: ['Sentence.id'],
    where: {
      user,
    },
    include: [{
      model: Vote,
      as: 'Vote',
      attributes: ['approval'],
      required: false,
    }, {
      model: Locale,
      as: 'Locale',
      attributes: ['name'],
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
    user,
    source,
    locale = FALLBACK_LOCALE,
  } = data;

  const batch = uuidv4();

  const { valid, validValidated, filtered } = validateSentences(locale, sentences);

  debug('Creating database entries');
  let duplicateCounter = 0;

  const addSentenceToDatabase = (sentence, isValidated) => {
    const params = {
      sentence,
      user,
      source,
      batch,
      localeId: locale,
    };

    return Sentence.create(params)
      .then((sentence) => {
        if (!isValidated) {
          return sentence;
        }

        const voteParams = {
          sentenceId: sentence.id,
          user,
          approval: true,
        };
        return addVoteForSentence(voteParams);
      })
      .catch((error) => {
        if (error.parent && error.parent.errno === DUPLICATE_ERROR) {
          debug('Ignoring duplicate sentence', sentence);
          duplicateCounter++;
        }
      });
  };

  const validPromises = valid.map((sentence) => addSentenceToDatabase(sentence, false));
  const validatedPromises = validValidated.map((sentence) => addSentenceToDatabase(sentence, true));

  await Promise.all([
    ...validPromises,
    ...validatedPromises,
  ]);

  return { errors: filtered, duplicates: duplicateCounter };
}
