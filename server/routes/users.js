'use strict';

const debug = require('debug')('sentencecollector:routes:users');
const express = require('express');
const users = require('../lib/users');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/whoami', async (req, res) => {
  debug('GET_CURRENT_USER');
  const { user } = req;

  try {
    if (user && user.email) {
      const extendedUser = await users.get(user.email);
      return res.json(extendedUser);
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
    res.json();
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

module.exports = router;
