'use strict';

const debug = require('debug')('sentencecollector:routes:sentences');
const express = require('express');

const sentences = require('../lib/sentences');

const STATUS_CREATED = 201;
const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', async (req, res) => {
  debug('GET_SENTENCES');
  sentences.getSentencesForLocale(req.query.locale)
    .then((foundSentences) => res.json(foundSentences))
    .catch((error) => {
      debug('GET_SENTENCES_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.put('/', async (req, res) => {
  debug('CREATE_SENTENCES');

  sentences.addSentences(req.body)
    .then(() => {
      res.status(STATUS_CREATED);
      res.send();
    })
    .catch((error) => {
      debug('CREATE_SENTENCES_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

module.exports = router;
