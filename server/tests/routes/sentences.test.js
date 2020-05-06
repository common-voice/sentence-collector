import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import sentences from '../../lib/sentences';

const sentencesMock = [{
  id: 1,
  sentence: 'Hi',
}, {
  id: 2,
  sentence: 'Hello',
}, {
  id: 3,
  sentence: 'This is a test.',
}];

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(sentences, 'getSentencesForLocale').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getSentencesForReview').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getRejectedSentences').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'addSentences').resolves(sentencesMock);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get sentences', async (t) => {
  const response = await request(app)
    .get('/sentences?locale=en');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getSentencesForLocale.calledWith('en'));
});

test.serial('getting sentences should pass on error message', async (t) => {
  sentences.getSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentences?locale=en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should get review sentences', async (t) => {
  const response = await request(app)
    .get('/sentences/review?locale=en&user=foo');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getSentencesForReview.calledWith({ user: 'foo', locale: 'en' }));
});

test.serial('getting review sentences should pass on error message', async (t) => {
  sentences.getSentencesForReview.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentences/review?locale=en&user=foo');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should get rejected sentences', async (t) => {
  const response = await request(app)
    .get('/sentences/rejected?user=foo');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getRejectedSentences.calledWith({ user: 'foo' }));
});

test.serial('getting rejected sentences should pass on error message', async (t) => {
  sentences.getRejectedSentences.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentences/rejected?user=foo');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should add sentences', async (t) => {
  const sentenceParams = {
    sentence: 'Hi',
    source: 'me',
  };

  const response = await request(app)
    .put('/sentences')
    .send(sentenceParams);

  t.is(response.status, 201);
  t.true(sentences.addSentences.calledWith(sentenceParams));
});

test.serial('adding sentences should pass on error message', async (t) => {
  sentences.addSentences.rejects(new Error('nope'));

  const response = await request(app)
    .put('/sentences');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});
