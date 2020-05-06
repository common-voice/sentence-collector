import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import votes from '../../lib/votes';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(votes, 'addVoteForSentence').resolves();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('does nothing if nothing passed', async (t) => {
  await request(app)
    .put('/votes')
    .expect('Content-Type', /json/)
    .expect(201, {
      votes: 0,
      failedVotes: 0,
    });

  t.false(votes.addVoteForSentence.called);
});

test.serial('adds votes - all approved', async (t) => {
  const user = 'user';

  await request(app)
    .put('/votes')
    .send({
      user,
      validated: [111, 112],
      invalidated: [],
    })
    .expect('Content-Type', /json/)
    .expect(201, {
      votes: 2,
      failedVotes: 0,
    });

  t.is(votes.addVoteForSentence.callCount, 2);

  t.true(votes.addVoteForSentence.calledWith({
    sentenceId: 111,
    approval: true,
    user,
  }));

  t.true(votes.addVoteForSentence.calledWith({
    sentenceId: 112,
    approval: true,
    user,
  }));
});

test.serial('adds votes - all rejected', async (t) => {
  const user = 'user';

  await request(app)
    .put('/votes')
    .send({
      user,
      validated: [],
      invalidated: [111, 112],
    })
    .expect('Content-Type', /json/)
    .expect(201, {
      votes: 2,
      failedVotes: 0,
    });

  t.is(votes.addVoteForSentence.callCount, 2);

  t.true(votes.addVoteForSentence.calledWith({
    sentenceId: 111,
    approval: false,
    user,
  }));

  t.true(votes.addVoteForSentence.calledWith({
    sentenceId: 112,
    approval: false,
    user,
  }));
});

test.serial('adds votes - mixed', async (t) => {
  const user = 'user';

  await request(app)
    .put('/votes')
    .send({
      user,
      validated: [109],
      invalidated: [111, 112],
    })
    .expect('Content-Type', /json/)
    .expect(201, {
      votes: 3,
      failedVotes: 0,
    });

  t.is(votes.addVoteForSentence.callCount, 3);

  t.true(votes.addVoteForSentence.calledWith({
    sentenceId: 109,
    approval: true,
    user,
  }));

  t.true(votes.addVoteForSentence.calledWith({
    sentenceId: 111,
    approval: false,
    user,
  }));

  t.true(votes.addVoteForSentence.calledWith({
    sentenceId: 112,
    approval: false,
    user,
  }));
});

test.serial('adds votes - single error', async (t) => {
  const user = 'user';
  votes.addVoteForSentence.onCall(1).rejects(new Error('nope'));

  await request(app)
    .put('/votes')
    .send({
      user,
      validated: [109],
      invalidated: [111],
    })
    .expect('Content-Type', /json/)
    .expect(201, {
      votes: 1,
      failedVotes: 1,
    });

  t.is(votes.addVoteForSentence.callCount, 2);
});
