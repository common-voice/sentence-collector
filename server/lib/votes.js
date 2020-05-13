'use strict';

const debug = require('debug')('sentencecollector:votes');
const { Vote } = require('./models');

module.exports = {
  addVoteForSentence,
};

async function addVoteForSentence(voteParams) {
  debug('ADDING_VOTE_FOR_SENTENCE', voteParams.sentenceId);

  try {
    const [, created] = await Vote.findOrCreate({
      where: {
        sentenceId: voteParams.sentenceId,
        user: voteParams.user,
      },
      defaults: voteParams,
    });

    if (!created) {
      throw new Error('NOT_CREATED_ALREADY_EXISTING');
    }
  } catch (error) {
    console.error('Failed adding vote for', voteParams.sentenceId);
    throw error;
  }
}
