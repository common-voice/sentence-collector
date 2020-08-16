'use strict';

const debug = require('debug')('sentencecollector:routes:languages');
const express = require('express');

const languages = require('../lib/languages');

const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  debug('GET_LANGUAGES', req.user);
  try {
    const allLanguages = languages.getAllLanguages();
    res.json(allLanguages);
  } catch (error) {
    debug('GET_STATS_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: error.message });
  }
});

module.exports = router;
