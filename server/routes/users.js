'use strict';

const debug = require('debug')('sentencecollector:routes:users');
const express = require('express');
const sentences = require('../lib/sentences');
const users = require('../lib/users');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/whoami', async (req, res) => {
  debug('GET_CURRENT_USER');
  const { user } = req;

  try {
    if (user && user.email) {
      const extendedUser = await users.get(user.email);
      const userStats = await sentences.getUserAddedSentencesPerLocale(user.email);
      return res.json({
        ...extendedUser,
        userStats,
      });
    }
  } catch (err) {
    // ignoring catch as we send a 404 anyway
  }

  res.status(404);
  res.send();
});

router.post('/settings', async (req, res) => {
  const {
    user,
    body: {
      key,
      value,
    },
  } = req;

  debug('SETTING_UPDATE', user && user.email);

  try {
    await users.updateSetting(user && user.email, key, value);
    res.json({});
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

router.put('/languages', async (req, res) => {
  const {
    user,
    body: {
      language,
    },
  } = req;

  debug('LANGUAGE_UPDATE', user && user.email, language);

  try {
    const updatedLanguages = await users.addLanguage(user && user.email, language);
    res.json(updatedLanguages);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

router.delete('/languages/:language', async (req, res) => {
  const {
    user,
    params: {
      language,
    },
  } = req;

  debug('LANGUAGE_REMOVAL', user && user.email, language);

  try {
    const updatedLanguages = await users.removeLanguage(user && user.email, language);
    res.json(updatedLanguages);
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

module.exports = router;
