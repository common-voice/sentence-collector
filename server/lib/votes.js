'use strict';

const debug = require('debug')('sentencecollector:votes');
const { Vote } = require('./models');

module.exports = {
  addVoteForSentence,
};

async function addVoteForSentence(voteParams, transaction) {
  debug('ADDING_VOTE_FOR_SENTENCE', voteParams.sentenceId);

  try {
    const [, created] = await Vote.findOrCreate({
      where: {
        sentenceId: voteParams.sentenceId,
        userId: voteParams.userId,
      },
      defaults: voteParams,
      transaction,
    });

    if (!created) {
      throw new Error('NOT_CREATED_ALREADY_EXISTING');
    }
  } catch (error) {
    console.error('Failed adding vote for', voteParams.sentenceId);
    throw error;
  }
}
