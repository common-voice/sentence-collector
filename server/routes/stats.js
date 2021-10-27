'use strict';

const debug = require('debug')('sentencecollector:routes:sentences');
const express = require('express');

const sentences = require('../lib/sentences');

const STATUS_ERROR = 500;

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', async (req, res) => {
  const sessionUserId = req.user && req.user.email;
  const queryLocales = req.query.locales || '';
  const locales = queryLocales.split(',');

  if (locales.length === 1 && !locales[0]) {
    return res.json({
      all: {},
      userUnreviewed: {},
      totals: { total: 0, languages: 0},
    });
  }

  debug('GET_STATS', sessionUserId);

  try {
    const [{ all, totals }, userUnreviewed] = await Promise.all([
      sentences.getStats(locales),
      sentences.getUnreviewedByYouCountForLocales(locales, sessionUserId),
    ]);

    res.json({
      all,
      totals,
      userUnreviewed,
    });
  } catch (error) {
    debug('GET_STATS_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_STATS_ERROR' });
  }
});

router.get('/general/:localeId', async (req, res) => {
  const localeId = req.params.localeId;
  debug('GET_STATS_FOR_LANGUAGE', localeId);

  try {
    const stats = await sentences.getAllStatsForLocale(localeId);

    res.json(stats);
  } catch (error) {
    debug('GET_STATS_FOR_LANGUAGE_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: 'GET_STATS_FOR_LANGUAGE_ERROR' });
  }
});

module.exports = router;
