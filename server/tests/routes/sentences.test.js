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
  t.context.sandbox.stub(sentences, 'getUndecidedSentencesForLocale').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getRejectedSentencesForLocale').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getSentencesForReview').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getRejectedSentences').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'getMySentences').resolves(sentencesMock);
  t.context.sandbox.stub(sentences, 'deleteMySentences').resolves({});
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
  t.true(sentences.getSentencesForLocale.calledWith({
    localeId: 'en',
    batch: undefined,
    source: undefined,
    sentence: undefined,
  }));
});

test.serial('getting sentences should pass on error message', async (t) => {
  sentences.getSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_SENTENCES_ERROR',
  });
});

test.serial('should get specific sentence info by sentence', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/en?sentence=Hi');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith({
    localeId: 'en',
    sentence: 'Hi',
    batch: undefined,
    source: undefined,
  }));
});

test.serial('should get specific sentence info by source', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/en?source=Foo');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith({
    localeId: 'en',
    source: 'Foo',
    batch: undefined,
    sentence: undefined,
  }));
});

test.serial('should get specific sentence info by batch', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/en?batch=1234-1234');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith({
    localeId: 'en',
    batch: '1234-1234',
    sentence: undefined,
    source: undefined,
  }));
});

test.serial('should get specific sentence info by multiple criteria', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/en?batch=1234-1234&sentence=Hi');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith({
    localeId: 'en',
    batch: '1234-1234',
    sentence: 'Hi',
    source: undefined,
  }));
});

test.serial('should get sentences text only', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/text/en');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith({ localeId: 'en' }));
  t.deepEqual(response.text, sentencesMock.map((sentence) => sentence.sentence).join('\n'));
});

test.serial('should pass error when getting sentences text only', async (t) => {
  sentences.getSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/text/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_SENTENCES_TEXT_ERROR',
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
    message: 'GET_APPROVED_SENTENCES_TEXT_ERROR',
  });
});

test.serial('should get undecided sentences text only', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/text/undecided/en');

  t.is(response.status, 200);
  t.true(sentences.getUndecidedSentencesForLocale.calledWith('en'));
  t.deepEqual(response.text, sentencesMock.map((sentence) => sentence.sentence).join('\n'));
});

test.serial('should pass error when getting undecided sentences text only', async (t) => {
  sentences.getUndecidedSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/text/undecided/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_UNDECIDED_SENTENCES_TEXT_ERROR',
  });
});

test.serial('should get rejected sentences text only', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/text/rejected/en');

  t.is(response.status, 200);
  t.true(sentences.getRejectedSentencesForLocale.calledWith('en'));
  t.deepEqual(response.text, sentencesMock.map((sentence) => sentence.sentence).join('\n'));
});

test.serial('should pass error when getting rejected sentences text only', async (t) => {
  sentences.getRejectedSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/text/rejected/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_UNDECIDED_SENTENCES_TEXT_ERROR',
  });
});

test.serial('should get list of sources', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/sources/en');

  t.is(response.status, 200);
  t.true(sentences.getSentencesForLocale.calledWith({ localeId: 'en' }));
  t.deepEqual(response.text, sentencesMock.map((sentence) => sentence.source).join('\n'));
});

test.serial('should pass error when getting list of sources', async (t) => {
  sentences.getSentencesForLocale.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/sources/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_SENTENCES_SOURCES_ERROR',
  });
});

test.serial('should get review sentences', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/review?locale=en');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getSentencesForReview.calledWith({ userId: undefined, locale: 'en' }));
});

test.serial('getting review sentences should pass on error message', async (t) => {
  sentences.getSentencesForReview.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/review?locale=en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_SENTENCES_FOR_REVIEW_ERROR',
  });
});

test.serial('should get rejected sentences', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/rejected');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getRejectedSentences.calledWith({ userId: undefined }));
});

test.serial('getting rejected sentences should pass on error message', async (t) => {
  sentences.getRejectedSentences.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/rejected');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_REJECTED_SENTENCES_ERROR',
  });
});

test.serial('should get my sentences', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/sentences/my');

  t.is(response.status, 200);
  t.deepEqual(response.body, sentencesMock);
  t.true(sentences.getMySentences.calledWith({ userId: undefined }));
});

test.serial('getting my sentences should pass on error message', async (t) => {
  sentences.getMySentences.rejects(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/sentences/my');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_MY_SENTENCES_ERROR',
  });
});

test.serial('should delete my sentences', async (t) => {
  const response = await request(app)
    .post('/sentence-collector/sentences/delete')
    .send({ sentences: [1] });

  t.is(response.status, 200);
  t.log(sentences.deleteMySentences.getCall(0).args);
  t.true(sentences.deleteMySentences.calledWith({ userId: undefined, sentenceIds: [1] }));
});

test.serial('deleting sentences should pass on error message', async (t) => {
  sentences.deleteMySentences.rejects(new Error('nope'));

  const response = await request(app)
    .post('/sentence-collector/sentences/delete')
    .send({ sentences: [1] });

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'DELETE_SENTENCES_ERROR',
  });
});

test.serial('should add sentences', async (t) => {
  const sentenceParams = {
    sentence: 'Hi',
    source: 'me',
    userId: undefined,
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
    message: 'CREATE_SENTENCES_ERROR',
  });
});
