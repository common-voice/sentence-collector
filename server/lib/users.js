'use strict';

const debug = require('debug')('sentencecollector:users');
const axios = require('axios');
const { User, Sentence, Vote } = require('./models');

const {
  KINTO_URL,
} = process.env;

const USER_BASE_URL = `${KINTO_URL}/v1/buckets/App/collections/User/records`;

module.exports = {
  get,
  createUserIfNecessary,
  updateSetting,
  addLanguage,
  removeLanguage,
  migrate,
};

async function get(email) {
  debug('GETTING_USER', email);
  const [user] = await User.findAll({ where: { email }});
  const userLanguages = user.languages || '';
  return {
    email: user.email,
    languages: userLanguages.split(',').filter(Boolean),
    settings: {
      useSwipeReview: user.useSwipeReview || false,
    },
  };
}

function createUserIfNecessary(email) {
  debug('CREATE_USER_IF_NECESSARY', email);
  return User.findOrCreate({ where: { email }});
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
  const [user] = await User.findAll({ where: { email }});
  if (!user) {
    return;
  }

  const userLanguages = user.languages || '';
  const languages = userLanguages.split(',');
  if (languages.includes(language)) {
    return languages;
  }

  const newLanguages = [...languages, language].filter(Boolean);

  await User.update({
    languages: newLanguages.join(','),
  }, {
    where: {
      email,
    },
  });

  return newLanguages;
}

async function removeLanguage(email, language) {
  debug('REMOVING_LANGUAGE', email, language);
  const [user] = await User.findAll({ where: { email }});
  if (!user) {
    return;
  }

  const userLanguages = user.languages || '';
  const languages = userLanguages.split(',');
  if (!languages.includes(language)) {
    return languages;
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

  return newLanguages;
}

async function migrate(email, username, password) {
  const dummyUser = `${username}@sentencecollector.local`;

  if (!KINTO_URL) {
    throw new Error('NO_KINTO_URL_SET');
  }

  const { data: responseContent } = await axios.get(`${USER_BASE_URL}/${username}`, {
    auth: {
      username,
      password,
    },
  });

  const {
    useSwipeReview = false,
    languages = [],
  } = responseContent.data;

  debug('UPDATE_WITH_LANGUAGES_SETTINGS');
  await User.update({
    languages: languages.join(','),
    useSwipeReview,
  }, {
    where: {
      email,
    },
  });

  debug('UPDATE_SENTENCES');
  await Sentence.update({
    userId: email,
  }, {
    where: {
      userId: dummyUser,
    },
  });

  debug('UPDATE_VOTES');
  await Vote.update({
    userId: email,
  }, {
    where: {
      userId: dummyUser,
    },
  });

  debug('DELETE_DUMMY_USER');
  await User.destroy({
    where: {
      email: dummyUser,
    },
  });
}
