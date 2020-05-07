import test from 'ava';
import sinon from 'sinon';
import { Vote } from '../../lib/models';
import votes from '../../lib/votes';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(Vote, 'create').returns();
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

  t.true(Vote.create.calledWith(voteParams));
});

test.serial('should catch error adding vote', async (t) => {
  Vote.create.throws(new Error('nope!'));

  const voteParams = {
    sentenceId: 1234,
    user: 'foo',
    approval: true,
  };

  t.notThrows(() => votes.addVoteForSentence(voteParams));
});