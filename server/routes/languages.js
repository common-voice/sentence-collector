'use strict';

const debug = require('debug')('sentencecollector:routes:languages');
const express = require('express');

const languages = require('../lib/languages');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) => {
  debug('GET_LANGUAGES');
  const allLanguages = languages.getAllLanguages();
  res.json(allLanguages);
});

module.exports = router;
