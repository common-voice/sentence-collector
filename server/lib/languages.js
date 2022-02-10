const debug = require('debug')('sentencecollector:languages');
const fetch = require('node-fetch');

const nativeNames = require('../../locales/native-names.json');
const { Sentence } = require('./models');

const FALLBACK_LOCALE = 'en';
const MAX_CACHE_AGE = 30 * 60 * 1000;
const cache = {};

module.exports = {
  FALLBACK_LOCALE,
  getAllLanguages,
  getLanguagesNotInPontoon,
};

async function getAllLanguages() {
  if (typeof cache.lastCacheUpdate !== 'undefined' && Date.now() - cache.lastCacheUpdate <= MAX_CACHE_AGE) {
    debug('RETURN_CACHED_LANGUAGES_LIST');
    return cache.languages;
  }

  debug('FETCHING_NEW_LANGUAGES_LIST');
  const fetchedLanguages = await fetchAllLanguages();
  cache.languages = fetchedLanguages;
  cache.lastCacheUpdate = Date.now();
  return fetchedLanguages;
}

async function fetchAllLanguages() {
  const pontoonLanguages = await fetchPontoonLanguages();
  const allLanguages = pontoonLanguages.map((languageCode) => {
    return {
      id: languageCode,
      nativeName: nativeNames[languageCode],
    };
  });

  return allLanguages;
}

async function getLanguagesNotInPontoon() {
  const pontoonLanguages = await fetchPontoonLanguages();
  const scLanguages = await getLanguagesWithSentences();
  const missingLanguages = scLanguages.filter((lang) => !pontoonLanguages.includes(lang));
  return missingLanguages;
}

async function fetchPontoonLanguages() {
  const query = '{ project(slug: "common-voice") { localizations { locale { code } } } }';
  const pontoonResponse = await fetch(`https://pontoon.mozilla.org/graphql?query=${query}`);

  const { data } = await pontoonResponse.json();

  return data.project.localizations
    .map(({ locale }) => locale.code)
    .concat('en');
}

async function getLanguagesWithSentences() {
  const distinct = await Sentence.aggregate('localeId', 'DISTINCT', { plain: false });
  const uniqueLanguages = distinct.map((entry) => entry.DISTINCT);
  return uniqueLanguages;
}
