'use strict';

const debug = require('debug')('sentencecollector:users');
const { User } = require('./models');

module.exports = {
  get,
  createUserIfNecessary,
  updateSetting,
};

async function get(email) {
  debug('GETTING_USER', email);
  const [user] = await User.findAll({ where: { email }});
  return {
    email: user.email,
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
