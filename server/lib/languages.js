const fetch = require('node-fetch');

const nativeNames = require('../../locales/native-names.json');
const { Sentence } = require('./models');

const FALLBACK_LOCALE = 'en';

module.exports = {
  FALLBACK_LOCALE,
  getAllLanguages,
  getLanguagesNotInPontoon,
};

async function getAllLanguages() {
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
  const pontoonResponse = await fetch('https://pontoon.mozilla.org/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
        project(slug: "common-voice") {
          localizations {
            locale {
              code
            }
          }
        }
      }`,
      variables: null,
    }),
  });

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
