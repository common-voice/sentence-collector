'use strict';

const debug = require('debug')('sentencecollector:routes:users');
const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/whoami', (req, res) => {
  debug('GET_CURRENT_USER');
  const { user } = req;

  if (user && user.email) {
    return res.json({ email: user.email });
  }

  res.status(404);
  res.send();
});

module.exports = router;
