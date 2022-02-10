'use strict';

const debug = require('debug')('sentencecollector:users');
const nativeNames = require('../../locales/native-names.json');
const languages = require('./languages');
const { User } = require('./models');

module.exports = {
  get,
  createUserIfNecessary,
  updateSetting,
  addLanguage,
  removeLanguage,
};

async function enhanceLanguages(languageCodes) {
  let allLanguages = [];
  try {
    allLanguages = await languages.getAllLanguages();
  } catch (error) {
    // Not returning any users languages is better than completely failing
  }

  const validLanguageCodes = languageCodes.filter((code) => allLanguages.find((language) => language.id === code));
  return validLanguageCodes.map((languageCode) => ({
    id: languageCode,
    nativeName: nativeNames[languageCode],
  }));
}

async function get(email) {
  debug('GETTING_USER', email);
  const [user] = await User.findAll({ where: { email } });
  const userLanguages = user.languages || '';
  const extendedUser = {
    email: user.email,
    languages: await enhanceLanguages(userLanguages.split(',').filter(Boolean)),
    settings: {},
  };
  return extendedUser;
}

function createUserIfNecessary(email) {
  debug('CREATE_USER_IF_NECESSARY', email);
  return User.findOrCreate({ where: { email } });
}

function updateSetting(email, key, value) {
  if (!email) {
    throw new Error('MISSING_USER');
  }

  if (!key || typeof value === 'undefined') {
    throw new Error('MISSING_SETTINGS_KEY_OR_VALUE');
  }

  return User.update({
    [key]: value,
  }, {
    where: {
      email,
    },
  });
}

async function addLanguage(email, language) {
  debug('ADDING_LANGUAGE', email, language);
  const [user] = await User.findAll({ where: { email } });
  if (!user) {
    return;
  }

  const userLanguages = user.languages || '';
  const languages = userLanguages.split(',');
  if (languages.includes(language)) {
    return await enhanceLanguages(languages);
  }

  const newLanguages = [...languages, language].filter(Boolean);

  await User.update({
    languages: newLanguages.join(','),
  }, {
    where: {
      email,
    },
  });

  const enhanced = await enhanceLanguages(newLanguages);
  return enhanced;
}

async function removeLanguage(email, language) {
  debug('REMOVING_LANGUAGE', email, language);
  const [user] = await User.findAll({ where: { email } });
  if (!user) {
    return;
  }

  const userLanguages = user.languages || '';
  const languages = userLanguages.split(',');
  if (!languages.includes(language)) {
    return await enhanceLanguages(languages);
  }

  const index = languages.indexOf(language);
  languages.splice(index, 1);

  const newLanguages = [...languages].filter(Boolean);

  await User.update({
    languages: newLanguages.join(','),
  }, {
    where: {
      email,
    },
  });

  const enhanced = await enhanceLanguages(newLanguages);
  return enhanced;
}
