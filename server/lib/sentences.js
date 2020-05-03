'use strict';

const debug = require('debug')('sentencecollector:sentences');
const { Sentence, Locale } = require('./models');
const { FALLBACK_LOCALE } = require('./languages');
const { validateSentences } = require('./validation');

const DUPLICATE_ERROR = 1062;

module.exports = {
  getSentencesForLocale,
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

  const { valid, filtered } = validateSentences(existingLocale.code, sentences);

  debug('Creating database entries');
  let duplicateCounter = 0;

  await Promise.all(
    valid.map((sentence) => {
      const params = {
        sentence,
        user,
        source,
        localeId: existingLocale.id,
      };

      return Sentence.create(params)
        .catch((error) => {
          if (error.parent && error.parent.errno === DUPLICATE_ERROR) {
            debug('Ignoring duplicate sentence', sentence);
            duplicateCounter++;
          }
        });
    })
  );

  return { errors: filtered, duplicates: duplicateCounter };
}
