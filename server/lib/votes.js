'use strict';

const debug = require('debug')('sentencecollector:votes');
const { Vote } = require('./models');

module.exports = {
  addVoteForSentence,
};

async function addVoteForSentence(voteParams) {
  debug('ADDING_VOTE_FOR_SENTENCE', voteParams.sentenceId);

  try {
    Vote.create(voteParams);
  } catch (error) {
    debug('Failed adding vote for', voteParams.sentenceId);
  }
}
