import ISO6391 from 'iso-639-1';

export const ENGLISH_CODE = 'en';

const ADDITIONAL_LANGUAGES = [
  {
    code: 'ace',
    name: 'Achinese',
    nativeName: 'بهسا اچيه',
  },
  {
    code: 'ady',
    name: 'Adyghe',
    nativeName: 'Адыгабзэ',
  },
  {
    code: 'ast',
    name: 'Asturian',
    nativeName: 'asturianu',
  },
  {
    code: 'bxr',
    name: 'Russia Buriat',
    nativeName: 'буряад хэлэн',
  },
  {
    code: 'cak',
    name: 'Kaqchikel',
    nativeName: 'Kaqchikel',
  },
  {
    code: 'cnh',
    name: 'Hakha Chin',
    nativeName: 'Lai',
  },
  {
    code: 'dsb',
    name: 'Lower Sorbian',
    nativeName: 'dolnoserbšćina',
  },
  {
    code: 'fy-NL',
    name: 'Frisian',
    nativeName: 'Frysk',
  },
  {
    code: 'ga-IE',
    name: 'Irish',
    nativeName: 'Irish',
  },
  {
    code: 'hsb',
    name: 'Upper Sorbian',
    nativeName: 'Hornjoserbšćina',
  },
  {
    code: 'kab',
    name: 'Kabyle',
    nativeName: 'Taqbaylit',
  },
  {
    code: 'kpv',
    name: 'Komi-Zyrian',
    nativeName: 'Коми кыв',
  },
  {
    code: 'mdf',
    name: 'Moksha',
    nativeName: 'мокшень кяль',
  },
  {
    code: 'mhr',
    name: 'Eastern Mari',
    nativeName: 'Eastern Mari',
  },
  {
    code: 'mrj',
    name: 'Western Mari',
    nativeName: 'Western Mari',
  },
  {
    code: 'myv',
    name: 'Erzya',
    nativeName: 'эрзянь кель',
  },
  {
    code: 'nb-NO',
    name: 'Norwegian Bokmål',
    nativeName: 'Bokmål',
  },
  {
    code: 'rm-sursilv',
    name: 'Romansh Sursilvan',
    nativeName: 'romontsch sursilvan',
  },
  {
    code: 'sah',
    name: 'Sakha',
    nativeName: 'Саха тыла',
  },
  {
    code: 'uby',
    name: 'Ubykh',
    nativeName: 'Ubykh',
  },
  {
    code: 'udm',
    name: 'Udmurt',
    nativeName: 'удмурт кыл',
  },
  {
    code: 'vot',
    name: 'Votic',
    nativeName: 'maaceeli',
  },
  {
    code: 'zh-CN',
    name: 'Chinese - China',
    nativeName: '中文 (中国)',
  },
  {
    code: 'zh-TW',
    name: 'Chinese - Taiwan',
    nativeName: '中文 (台灣)',
  },
  {
    code: 'zh-HK',
    name: 'Chinese - Hong Kong',
    nativeName: '中文 (香港)',
  },
];

const LANGUAGES_TO_REMOVE = [
  'zh',
  'nn' // coverted by nn-NO
];

export const getAllLanguages = () => {
  const isoLanguages = ISO6391.getLanguages(ISO6391.getAllCodes());
  const languagesWithoutRemoved = removeLanguages(isoLanguages);
  const allLanguages = addAdditionalLanguages(languagesWithoutRemoved);
  const allLanguagesSorted = allLanguages.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return allLanguagesSorted;
};

export const getLanguages = (codes) => {
  const allLanguages = getAllLanguages();
  const filteredLangauges = allLanguages.filter((lang) => codes.includes(lang.code));
  return filteredLangauges;
};

export const getLanguageName = (code) => {
  const language = getAllLanguages().find((language) => language.code === code);

  if (!language) {
    return 'ERROR - UNKNOWN - ' + code;
  }

  return language.nativeName;
};

function removeLanguages(languages) {
  return languages.filter((language) => {
    return !LANGUAGES_TO_REMOVE.includes(language.code);
  });
}

function addAdditionalLanguages(languages) {
  return languages.concat(ADDITIONAL_LANGUAGES);
}