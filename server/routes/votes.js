'use strict';

const debug = require('debug')('sentencecollector:routes:votes');
const express = require('express');

const votes = require('../lib/votes');

const STATUS_CREATED = 201;

const router = express.Router(); // eslint-disable-line new-cap

router.put('/', async (req, res) => {
  debug('CREATE_VOTES', req.body);

  const submittedVotes = req.body.votes || [];
  let errorCounter = 0;

  const promises = submittedVotes.map(async (vote) => {
    try {
      await votes.addVoteForSentence(vote);
    } catch (error) {
      debug('CREATE_VOTES_ERROR', error);
      errorCounter++;
    }
  });

  await Promise.all(promises);

  res.status(STATUS_CREATED);
  res.json({ failedVotes: errorCounter });
});

module.exports = router;
