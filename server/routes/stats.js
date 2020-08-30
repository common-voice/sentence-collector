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
      all: 0,
      user: 0,
      userUnreviewed: 0,
    });
  }

  debug('GET_STATS', sessionUserId);

  try {
    const [all, user, userUnreviewed] = await Promise.all([
      sentences.getStats(locales),
      sentences.getUserAddedSentencesPerLocale(sessionUserId),
      sentences.getUnreviewedByYouCountForLocales(locales, sessionUserId),
    ]);

    res.json({
      all,
      user,
      userUnreviewed,
    });
  } catch (error) {
    debug('GET_STATS_ERROR', error);
    res.status(STATUS_ERROR);
    res.json({ message: error.message });
  }
});

module.exports = router;
