import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import sentences from '../../lib/sentences';

const sentencesMock = [{
  id: 1,
  sentence: 'Hi',
  source: 'Myself',
}, {
  id: 2,
  sentence: 'Hello',
  source: 'CC0 Source',
}, {
  id: 3,
  sentence: 'This is a test.',
  source: 'Really old book',
}];

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(sentences, 'getSentencesForLocale').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getApprovedSentencesForLocale').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getSentencesForReview').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getRejectedSentences').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'addSentences').resolves(sentencesMock);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get sentences', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/en');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getSentencesForLocale.calledWith('en'));
});

test.serial('getting sentences should pass on error message', async (t) => {
  sentences.getSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should get specific sentence info', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/en?sentence=Hi');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith('en', 'Hi'));
});

test.serial('should get sentences text only', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/text/en');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith('en'));
  t.deepEqual(response.text, sentencesMock.map((sentence) => sentence.sentence).join('\n'));
});

test.serial('should pass error when getting sentences text only', async (t) => {
  sentences.getSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/text/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should get approved sentences text only', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/text/approved/en');

  t.is(response.status, 200);
  t.true(sentences.getApprovedSentencesForLocale.calledWith('en'));
  t.deepEqual(response.text, sentencesMock.map((sentence) => sentence.sentence).join('\n'));
});

test.serial('should pass error when getting approved sentences text only', async (t) => {
  sentences.getApprovedSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/text/approved/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should get list of sources', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/sources/en');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith('en'));
  t.deepEqual(response.text, sentencesMock.map((sentence) => sentence.source).join('\n'));
});

test.serial('should pass error when getting list of sources', async (t) => {
  sentences.getSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/sources/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should get review sentences', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/review?locale=en');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getSentencesForReview.calledWith({ user: undefined, locale: 'en' }));
});

test.serial('getting review sentences should pass on error message', async (t) => {
  sentences.getSentencesForReview.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/review?locale=en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should get rejected sentences', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/rejected');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getRejectedSentences.calledWith({ user: undefined }));
});

test.serial('getting rejected sentences should pass on error message', async (t) => {
  sentences.getRejectedSentences.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/rejected');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('should add sentences', async (t) => {
  const sentenceParams = {
    sentence: 'Hi',
    source: 'me',
    user: undefined,
  };

  const response = await request(app)
    .put('/sentence-collector/sentences')
    .send(sentenceParams);

  t.is(response.status, 201);
  t.true(sentences.addSentences.calledWith(sentenceParams));
});

test.serial('adding sentences should pass on error message', async (t) => {
  sentences.addSentences.rejects(new Error('nope'));

  const response = await request(app)
    .put('/sentence-collector/sentences');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});
