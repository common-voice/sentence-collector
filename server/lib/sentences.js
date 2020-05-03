'use strict';

const debug = require('debug')('sentencecollector:sentences');
const { Sentence, Locale, Vote } = require('./models');
const { FALLBACK_LOCALE } = require('./languages');
const { validateSentences } = require('./validation');
const { addVoteForSentence } = require('./votes');

const DUPLICATE_ERROR = 1062;

module.exports = {
  getSentencesForLocale,
  getSentencesForReview,
  getRejectedSentences,
  addSentences,
};

async function getSentencesForLocale(locale) {
  debug('GETTING_SENTENCES_FOR_LOCALE', locale);
  const options = {
    order: [['createdAt', 'DESC']],
  };

  if (locale) {
    const existingLocale = await Locale.findOne({
      where: {
        code: locale,
      },
    });

    options.where = {
      localeId: existingLocale.id,
    };
  }

  return Sentence.findAll(options);
}

async function getSentencesForReview({ locale, user }) {
  debug('GETTING_SENTENCES_FOR_LOCALE', locale);

  const existingLocale = await Locale.findOne({
    where: {
      code: locale,
    },
  });

  const options = {
    order: [['createdAt', 'ASC']],
    attributes: ['id', 'sentence', 'Vote.approval', 'Vote.user'],
    where: {
      localeId: existingLocale.id,
    },
    include: [{
      model: Vote,
      as: 'Vote',
      attributes: ['approval', 'user'],
      required: false,
    }],
  };

  const sentences = await Sentence.findAll(options);

  // TODO: all of this should be done in the query...
  const notYetApprovedOrRejected = sentences.filter((sentence) => {
    const approvals = sentence.Vote.filter((vote) => vote.approval);
    const rejections = sentence.Vote.filter((vote) => vote.approval === false);

    const hasLessThan2Approvals = approvals.length < 2;
    const hasLessThan2Rejections = rejections.length < 2;
    const notVotedByUser = !sentence.Vote.find((vote) => vote.user === user);
    return hasLessThan2Approvals && hasLessThan2Rejections && notVotedByUser;
  }).sort((a, b) => {
    const aVoteLength = a.Vote.length;
    const bVoteLength = b.Vote.length;

    return bVoteLength - aVoteLength;
  });
  return notYetApprovedOrRejected;
}

async function getRejectedSentences({ user }) {
  debug('GETTING_REJECTED_SENTENCES');

  const options = {
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'sentence', 'Vote.approval', 'Locale.name'],
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

  // TODO: all of this should be done in the query...
  const rejectedSentences = sentences.filter((sentence) => {
    const rejections = sentence.Vote.filter((vote) => vote.approval === false);
    return rejections.length >= 2;
  }).reduce((rejected, sentenceInfo) => {
    const locale = sentenceInfo.Locale.name;
    rejected[locale] = rejected[locale] || [];
    rejected[locale].push(sentenceInfo);
    return rejected;
  }, {});
  return rejectedSentences;
}

async function addSentences(data) {
  const {
    sentences,
    user,
    source,
    locale = FALLBACK_LOCALE,
  } = data;

  const existingLocale = await Locale.findOne({
    where: {
      code: locale,
    },
  });

  const { valid, validValidated, filtered } = validateSentences(existingLocale.code, sentences);

  debug('Creating database entries');
  let duplicateCounter = 0;

  const addSentenceToDatabase = (sentence, isValidated) => {
    const params = {
      sentence,
      user,
      source,
      localeId: existingLocale.id,
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
