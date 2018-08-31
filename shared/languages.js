import ISO6391 from 'iso-639-1';

export const getAllLanguages =
  () => ISO6391.getLanguages(ISO6391.getAllCodes());

export const getLanguages = ISO6391.getLanguages.bind(ISO6391);

export const getLanguageName = ISO6391.getNativeName.bind(ISO6391);
