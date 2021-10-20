const ISO6391 = require('iso-639-1');
const fetch = require('node-fetch');

const { Sentence } = require('./models');

const FALLBACK_LOCALE = 'en';

module.exports = {
  FALLBACK_LOCALE,
  getAllLanguages,
  getMissingLanguages,
  getLanguagesNotInPontoon,
};

const ADDITIONAL_LANGUAGES = [
  {
    id: 'ace',
    name: 'Achinese',
    nativeName: 'بهسا اچيه',
  },
  {
    id: 'ady',
    name: 'Adyghe',
    nativeName: 'Адыгабзэ',
  },
  {
    id: 'arn',
    name: 'Mapudungun',
    nativeName: 'Mapudungun',
  },
  {
    id: 'ast',
    name: 'Asturian',
    nativeName: 'asturianu',
  },
  {
    id: 'bas',
    name: 'Basaa',
    nativeName: 'Ɓàsàa',
  },
  {
    id: 'bxr',
    name: 'Russia Buriat',
    nativeName: 'буряад хэлэн',
  },
  {
    id: 'cak',
    name: 'Kaqchikel',
    nativeName: 'Kaqchikel',
  },
  {
    id: 'ckb',
    name: 'Central Kurdish',
    nativeName: 'کوردی',
  },
  {
    id: 'cnh',
    name: 'Hakha Chin',
    nativeName: 'Lai',
  },
  {
    id: 'dsb',
    name: 'Lower Sorbian',
    nativeName: 'dolnoserbšćina',
  },
  {
    id: 'ff',
    name: 'Fulah',
    nativeName: 'Pulaar-Fulfulde',
  },
  {
    id: 'fy-NL',
    name: 'Frisian',
    nativeName: 'Frysk',
  },
  {
    id: 'ga-IE',
    name: 'Irish',
    nativeName: 'Irish',
  },
  {
    id: 'hsb',
    name: 'Upper Sorbian',
    nativeName: 'Hornjoserbšćina',
  },
  {
    id: 'izh',
    name: 'Izhorian',
    nativeName: 'Izhorian',
  },
  {
    id: 'kaa',
    name: 'Karakalpak',
    nativeName: 'Qaraqalpaq tili',
  },
  {
    id: 'kab',
    name: 'Kabyle',
    nativeName: 'Taqbaylit',
  },
  {
    id: 'kbd',
    name: 'Kabardian',
    nativeName: 'Адыгэбзэ',
  },
  {
    id: 'kmr',
    name: 'Northern Kurdish',
    nativeName: 'Kurdî (Kurmancî)',
  },
  {
    id: 'kpv',
    name: 'Komi-Zyrian',
    nativeName: 'Коми кыв',
  },
  {
    id: 'ks',
    name: 'Kashmiri',
    nativeName: 'كٲشُر',
  },
  {
    id: 'lij',
    name: 'Ligurian',
    nativeName: 'Lìgure',
  },
  { // https://github.com/common-voice/common-voice/issues/3043
    id: 'mai',
    name: 'Maithili',
    nativeName: 'मैथिली',
  },
  {
    id: 'mdf',
    name: 'Moksha',
    nativeName: 'мокшень кяль',
  },
  {
    id: 'mhr',
    name: 'Eastern Mari',
    nativeName: 'Eastern Mari',
  },
  { // https://github.com/common-voice/common-voice/issues/2945
    id: 'mos',
    name: 'Mossi',
    nativeName: 'Mooré',
  },
  {
    id: 'mrj',
    name: 'Western Mari',
    nativeName: 'Western Mari',
  },
  {
    id: 'myv',
    name: 'Erzya',
    nativeName: 'эрзянь кель',
  },
  { // https://github.com/common-voice/common-voice/issues/3194
    id: 'nan-tw',
    name: 'Taiwanese',
    nativeName: '臺語',
  },
  {
    id: 'ne-NP',
    name: 'Nepali',
    nativeName: 'नेपाली',
  },
  { // https://github.com/common-voice/common-voice/issues/3160
    id: 'nia',
    name: 'Nias',
    nativeName: 'Li Niha',
  },
  {
    id: 'nb-NO',
    name: 'Norwegian',
    nativeName: 'Norsk bokmål',
  },
  {
    id: 'nn-NO',
    name: 'Norwegian',
    nativeName: 'Norsk nynorsk',
  },
  {
    id: 'nyn',
    name: 'Nyankole',
    nativeName: 'Runyankore',
  },
  {
    id: 'pa-IN',
    name: 'Panjabi',
    nativeName: 'ਪੰਜਾਬੀ',
  },
  { // https://github.com/common-voice/common-voice/issues/3044
    id: 'pap-AW',
    name: 'Papiamento - Aruba',
    nativeName: 'Papiamento',
  },
  {
    id: 'quc',
    name: 'Kʼicheʼ',
    nativeName: 'Kʼicheʼ',
  },
  {
    id: 'rm-sursilv',
    name: 'Romansh Sursilvan',
    nativeName: 'romontsch sursilvan',
  },
  {
    id: 'rm-vallader',
    name: 'Romansh Vallader',
    nativeName: 'rumantsch vallader',
  },
  {
    id: 'sah',
    name: 'Sakha',
    nativeName: 'Саха тыла',
  },
  { // https://github.com/common-voice/common-voice/issues/3214
    id: 'sat',
    name: 'Santali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
  },
  {
    id: 'scn',
    name: 'Sicilian',
    nativeName: 'sicilianu',
  },
  { // https://github.com/common-voice/common-voice/issues/3032
    id: 'shi',
    name: 'Shilha',
    nativeName: 'Taclḥit',
  },
  {
    id: 'sv-SE',
    name: 'Swedish',
    nativeName: 'Svenska',
  },
  {
    id: 'syr',
    name: 'Syriac',
    nativeName: 'ܣܘܼܪܝܝܐ',
  },
  {
    id: 'uby',
    name: 'Ubykh',
    nativeName: 'Ubykh',
  },
  {
    id: 'udm',
    name: 'Udmurt',
    nativeName: 'удмурт кыл',
  },
  {
    id: 'vec',
    name: 'Venetian',
    nativeName: 'vèneto',
  },
  {
    id: 'vot',
    name: 'Votic',
    nativeName: 'maaceeli',
  },
  {
    id: 'zh-CN',
    name: 'Chinese - China',
    nativeName: '中文 (中国)',
  },
  {
    id: 'zh-TW',
    name: 'Chinese - Taiwan',
    nativeName: '中文 (台灣)',
  },
  {
    id: 'zh-HK',
    name: 'Chinese - Hong Kong',
    nativeName: '中文 (香港)',
  },
  {
    id: 'yue',
    name: 'Cantonese',
    nativeName: '粵語',
  },
];

const LANGUAGES_TO_REMOVE = [
  'ku',
  'zh',
  'nb', // covered by nb-NO
  'nn', // covered by nn-NO
  'no', // covered by nb-NO and nn-NO
  'ks', // re-added above as native name is wrong
  'ff', // re-added - https://discourse.mozilla.org/t/fulah-language-naming-consistency/78378
  'ga', // covered by ga-IE
  'sv', // covered by sv-SE
  'ne', // covered by ne-NP
  'pa', // covered by pa-IN
];

const isoLanguages = ISO6391.getLanguages(ISO6391.getAllCodes());
const languagesWithoutRemoved = removeLanguages(isoLanguages);
const codeIdReplaced = languagesWithoutRemoved.map((lang) => ({
  id: lang.code,
  name: lang.name,
  nativeName: lang.nativeName,
}));
const allLanguages = addAdditionalLanguages(codeIdReplaced);
const allLanguagesSorted = allLanguages.sort((a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});
const loadedLanguages = allLanguagesSorted;

function getAllLanguages() {
  return loadedLanguages;
}

function removeLanguages(languages) {
  return languages.filter((language) => !LANGUAGES_TO_REMOVE.includes(language.code));
}

function addAdditionalLanguages(languages) {
  return languages.concat(ADDITIONAL_LANGUAGES);
}

async function getMissingLanguages() {
  const pontoonLanguages = await fetchPontoonLanguages();
  const scLanguages = loadedLanguages.map(({ id }) => id);
  const missingLanguages = pontoonLanguages.filter((lang) => !scLanguages.includes(lang));
  return missingLanguages;
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
