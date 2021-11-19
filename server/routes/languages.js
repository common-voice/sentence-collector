'use strict';

const debug = require('debug')('sentencecollector:routes:languages');
const express = require('express');

const languages = require('../lib/languages');

const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', async (req, res) => {
  debug('GET_LANGUAGES');
  try {
    const allLanguages = await languages.getAllLanguages();
    res.json(allLanguages);
  } catch (error) {
    debug('GET_LANGUAGES_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_LANGUAGES_ERROR' });
  }
});

router.get('/additional', async (req, res) => {
  debug('GET_ADDITIONAL_LANGUAGES');
  try {
    const additionalLanguages = await languages.getLanguagesNotInPontoon();
    res.json(additionalLanguages);
  } catch (error) {
    debug('GET_ADDITIONAL_LANGUAGES_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_ADDITIONAL_LANGUAGES_ERROR' });
  }
});

module.exports = router;
