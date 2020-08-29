'use strict';

const debug = require('debug')('sentencecollector:routes:votes');
const express = require('express');

const votes = require('../lib/votes');

const STATUS_CREATED = 201;

const router = express.Router(); // eslint-disable-line new-cap

router.put('/', async (req, res) => {
  debug('CREATE_VOTES', req.body);

  const validated = req.body.validated || [];
  const invalidated = req.body.invalidated || [];
  let errorCounter = 0;

  const vote = async (sentenceId, isValidated) => {
    try {
      const voteParams = {
        sentenceId: sentenceId,
        userId: req.user && req.user.id,
        approval: isValidated,
      };
      await votes.addVoteForSentence(voteParams);
    } catch (error) {
      console.error('CREATE_VOTES_ERROR', error);
      errorCounter++;
    }
  };

  const promises = [
    ...validated.map((sentenceId) => vote(sentenceId, true)),
    ...invalidated.map((sentenceId) => vote(sentenceId, false)),
  ];

  await Promise.all(promises);

  const submittedVotes = validated.length + invalidated.length;
  res.status(STATUS_CREATED);
  res.json({
    votes: submittedVotes - errorCounter,
    failedVotes: errorCounter,
  });
});

module.exports = router;
