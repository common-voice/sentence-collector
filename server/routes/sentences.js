'use strict';

const debug = require('debug')('sentencecollector:routes:sentences');
const express = require('express');

const sentences = require('../lib/sentences');

const STATUS_CREATED = 201;
const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/review', async (req, res) => {
  debug('GET_SENTENCES_FOR_REVIEW');
  const locale = req.query.locale;
  const user = req.query.user;
  sentences.getSentencesForReview({ locale, user })
    .then((foundSentences) => res.json(foundSentences))
    .catch((error) => {
      debug('GET_SENTENCES_FOR_REVIEW_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.get('/rejected', async (req, res) => {
  debug('GET_REJECTED_SENTENCES');
  const user = req.query.user;
  sentences.getRejectedSentences({ user })
    .then((foundSentences) => res.json(foundSentences))
    .catch((error) => {
      debug('GET_REJECTED_SENTENCES_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.put('/', async (req, res) => {
  debug('CREATE_SENTENCES', req.body);

  sentences.addSentences(req.body)
    .then((result) => {
        res.status(STATUS_CREATED);
        res.json(result);
      })
      .catch((error) => {
        debug('CREATE_SENTENCES_ERROR', error);
        res.status(STATUS_ERROR);
        res.json({ message: error.message });
      });
});

router.get('/:locale', async (req, res) => {
  debug('GET_SENTENCES');
  sentences.getSentencesForLocale(req.params.locale, req.query.sentence)
    .then((foundSentences) => res.json(foundSentences))
    .catch((error) => {
      debug('GET_SENTENCES_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.get('/text/:locale', async (req, res) => {
  debug('GET_SENTENCES_TEXT');
  sentences.getSentencesForLocale(req.params.locale)
    .then((foundSentences) => {
      const sentencesOnly = foundSentences.map((sentence) => sentence.sentence);
      const sentencesPerLine = sentencesOnly.join('\n');
      res.header('Content-Type', 'text/plain');
      res.send(sentencesPerLine);
    })
    .catch((error) => {
      debug('GET_SENTENCES_TEXT_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

router.get('/sources/:locale', async (req, res) => {
  debug('GET_SENTENCES_SOURCES');
  sentences.getSentencesForLocale(req.params.locale)
    .then((foundSentences) => {
      const sources = Array.from(new Set(foundSentences.map((sentence) => sentence.source)));
      console.log(sources.length);
      const sourcesPerLine = sources.join('\n');
      res.header('Content-Type', 'text/plain');
      res.send(sourcesPerLine);
    })
    .catch((error) => {
      debug('GET_SENTENCES_SOURCES_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: error.message });
    });
});

module.exports = router;
