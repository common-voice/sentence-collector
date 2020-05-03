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
    where: {
      '$Vote.user$': null,
      localeId: existingLocale.id,
    },
    include: [{
      model: Vote,
      as: 'Vote',
      required: false,
      where: { user },
    }],
  };

  const sentences = await Sentence.findAll(options);
  return sentences;
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
