'use strict';

const debug = require('debug')('sentencecollector:sentences');
const { Sentence, Locale } = require('./models');
const { FALLBACK_LOCALE } = require('./languages');

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


  return Promise.all(
    sentences.map((sentence) => {
      const params = {
        sentence,
        user,
        source,
        localeId: existingLocale.id,
      };

      return Sentence.create(params);
    })
  );
}
