const ISO6391 = require('iso-639-1');

const FALLBACK_LOCALE = 'en';

const LANGUAGE_MAPPING = {
  // CV - Sentence Collector
  'ne-NP': 'ne',
  'sv-SE': 'sv',
  'pa-IN': 'pa',
};

module.exports = {
  FALLBACK_LOCALE,
  LANGUAGE_MAPPING,
  getAllLanguages,
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
    id: 'kmr',
    name: 'Kurmanji Kurdish',
    nativeName: 'Kurmancî',
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
    id: 'mdf',
    name: 'Moksha',
    nativeName: 'мокшень кяль',
  },
  {
    id: 'mhr',
    name: 'Eastern Mari',
    nativeName: 'Eastern Mari',
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
  {
    id: 'nb-NO',
    name: 'Norwegian Bokmål',
    nativeName: 'Bokmål',
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
  {
    id: 'scn',
    name: 'Sicilian',
    nativeName: 'sicilianu',
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
];

const LANGUAGES_TO_REMOVE = [
  'ku',
  'zh',
  'nn', // coverted by nn-NO
  'ks', // re-added above as native name is wrong
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
