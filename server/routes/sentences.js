'use strict';

const debug = require('debug')('sentencecollector:routes:sentences');
const express = require('express');

const sentences = require('../lib/sentences');

const STATUS_CREATED = 201;
const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/review', async (req, res) => {
  const locale = req.query.locale;
  const userId = req.user && req.user.email;
  debug('GET_SENTENCES_FOR_REVIEW', userId);

  try {
    const foundSentences = await sentences.getSentencesForReview({ locale, userId });
    res.json(foundSentences);
  } catch (error) {
    debug('GET_SENTENCES_FOR_REVIEW_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_SENTENCES_FOR_REVIEW_ERROR' });
  }
});

router.get('/rejected', async (req, res) => {
  const userId = req.user && req.user.email;
  debug('GET_REJECTED_SENTENCES', userId);
  sentences.getRejectedSentences({ userId })
    .then((foundSentences) => res.json(foundSentences))
    .catch((error) => {
      debug('GET_REJECTED_SENTENCES_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: 'GET_REJECTED_SENTENCES_ERROR' });
    });
});

router.get('/my', async (req, res) => {
  const userId = req.user && req.user.email;
  debug('GET_MY_SENTENCES', userId);
  sentences.getMySentences({ userId })
    .then((foundSentences) => res.json(foundSentences))
    .catch((error) => {
      debug('GET_MY_SENTENCES_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: 'GET_MY_SENTENCES_ERROR' });
    });
});

router.post('/delete', async (req, res) => {
  const userId = req.user && req.user.email;
  const sentenceIds = req.body.sentences;
  debug('DELETE_MY_SENTENCES', userId);
  sentences.deleteMySentences({ userId, sentenceIds })
    .then(() => res.json({}))
    .catch((error) => {
      debug('DELETE_SENTENCES_ERROR', error);
      res.status(STATUS_ERROR);
      res.json({ message: 'DELETE_SENTENCES_ERROR' });
    });
});

router.put('/', async (req, res) => {
  const userId = req.user && req.user.email;
  debug('CREATE_SENTENCES', req.body, userId);

  try {
    const result = await sentences.addSentences({ ...req.body, userId });
    res.status(STATUS_CREATED);
    res.json(result);
  } catch (error) {
    debug('CREATE_SENTENCES_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'CREATE_SENTENCES_ERROR' });
  }
});

router.get('/:locale', async (req, res) => {
  debug('GET_SENTENCES');

  try {
    const foundSentences = await sentences.getSentencesForLocale({
      localeId: req.params.locale,
      sentence: req.query.sentence,
      source: req.query.source,
      batch: req.query.batch,
    });
    res.json(foundSentences);
  } catch (error) {
    debug('GET_SENTENCES_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_SENTENCES_ERROR' });
  }
});

router.get('/text/:locale', async (req, res) => {
  debug('GET_SENTENCES_TEXT');

  try {
    const foundSentences = await sentences.getSentencesForLocale({ localeId: req.params.locale });
    const sentencesOnly = foundSentences.map((sentence) => sentence.sentence);
    const sentencesPerLine = sentencesOnly.join('\n');
    res.header('Content-Type', 'text/plain');
    res.send(sentencesPerLine);
  } catch (error) {
    debug('GET_SENTENCES_TEXT_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_SENTENCES_TEXT_ERROR' });
  }
});

router.get('/text/approved/:locale', async (req, res) => {
  debug('GET_APPROVED_SENTENCES_TEXT');

  try {
    const foundSentences = await sentences.getApprovedSentencesForLocale(req.params.locale);
    const sentencesOnly = foundSentences.map((sentence) => sentence.sentence);
    const sentencesPerLine = sentencesOnly.join('\n');
    res.header('Content-Type', 'text/plain');
    res.send(sentencesPerLine);
  } catch (error) {
    debug('GET_APPROVED_SENTENCES_TEXT_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_APPROVED_SENTENCES_TEXT_ERROR' });
  }
});

router.get('/text/undecided/:locale', async (req, res) => {
  debug('GET_OPEN_SENTENCES_TEXT');

  try {
    const foundSentences = await sentences.getUndecidedSentencesForLocale(req.params.locale);
    const sentencesOnly = foundSentences.map((sentence) => sentence.sentence);
    const sentencesPerLine = sentencesOnly.join('\n');
    res.header('Content-Type', 'text/plain');
    res.send(sentencesPerLine);
  } catch (error) {
    debug('GET_UNDECIDED_SENTENCES_TEXT_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_UNDECIDED_SENTENCES_TEXT_ERROR' });
  }
});

router.get('/text/rejected/:locale', async (req, res) => {
  debug('GET_REJECTED_SENTENCES_TEXT');

  try {
    const foundSentences = await sentences.getRejectedSentencesForLocale(req.params.locale);
    const sentencesOnly = foundSentences.map((sentence) => sentence.sentence);
    const sentencesPerLine = sentencesOnly.join('\n');
    res.header('Content-Type', 'text/plain');
    res.send(sentencesPerLine);
  } catch (error) {
    debug('GET_UNDECIDED_SENTENCES_TEXT_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_UNDECIDED_SENTENCES_TEXT_ERROR' });
  }
});

router.get('/sources/:locale', async (req, res) => {
  debug('GET_SENTENCES_SOURCES');

  try {
    const foundSentences = await sentences.getSentencesForLocale({ localeId: req.params.locale });
    const sources = Array.from(new Set(foundSentences.map((sentence) => sentence.source)));
    const sourcesPerLine = sources.join('\n');
    res.header('Content-Type', 'text/plain');
    res.send(sourcesPerLine);
  } catch (error) {
    debug('GET_SENTENCES_SOURCES_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_SENTENCES_SOURCES_ERROR' });
  }
});

module.exports = router;
