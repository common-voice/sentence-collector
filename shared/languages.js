import ISO6391 from 'iso-639-1';

export const ENGLISH_CODE = 'en';

const ADDITIONAL_LANGUAGES = [
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
];

export const getAllLanguages = () => {
  const isoLanguages = ISO6391.getLanguages(ISO6391.getAllCodes());
  const allLanguages = changeLanguages(isoLanguages);
  return allLanguages;
};

export const getLanguages = (codes) => {
  const languages = ISO6391.getLanguages(codes);
  return languages;
};

export const getLanguageName = (code) => {
  const language = getAllLanguages().find((language) => language.code === code);

  if (!language) {
    return 'ERROR - UNKNOWN - ' + code;
  }

  return language.nativeName;
};

function changeLanguages(isoLanguages) {
  const languagesWithoutRemoved = isoLanguages.filter((language) => {
    return !LANGUAGES_TO_REMOVE.includes(language.code);
  });

  const allLanguages = languagesWithoutRemoved.concat(ADDITIONAL_LANGUAGES);
  return allLanguages;
}