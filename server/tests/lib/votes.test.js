import test from 'ava';
import sinon from 'sinon';
import { Vote } from '../../lib/models';
import votes from '../../lib/votes';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(Vote, 'findOrCreate').resolves([undefined, true]);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('adds vote', async (t) => {
  const voteParams = {
    sentenceId: 1234,
    user: 'foo',
    approval: true,
  };

  await votes.addVoteForSentence(voteParams);

  t.true(Vote.findOrCreate.calledWith({
    where: {
      sentenceId: voteParams.sentenceId,
      user: voteParams.user,
    },
    defaults: voteParams,
  }));
});

test.serial('should forward error adding vote', async (t) => {
  Vote.findOrCreate.rejects(new Error('nope!'));

  const voteParams = {
    sentenceId: 1234,
    user: 'foo',
    approval: true,
  };

  await t.throwsAsync(() => votes.addVoteForSentence(voteParams));
});

test.serial('should not count vote if already existing vote', async (t) => {
  Vote.findOrCreate.resolves([undefined, false]);

  const voteParams = {
    sentenceId: 1234,
    user: 'foo',
    approval: true,
  };

  await t.throwsAsync(() => votes.addVoteForSentence(voteParams));
});