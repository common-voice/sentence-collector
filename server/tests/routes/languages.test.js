import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import languages from '../../lib/languages';

const allLanguages = [{
  id: 'en',
  name: 'English',
  nativeName: 'English',
}, {
  id: 'de',
  name: 'German',
  nativeName: 'Deutsch',
}];

const missingLanguages = ['en'];
const additionalLanguages = ['de'];

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(languages, 'getAllLanguages').returns(allLanguages);
  t.context.sandbox.stub(languages, 'getMissingLanguages').returns(missingLanguages);
  t.context.sandbox.stub(languages, 'getLanguagesNotInPontoon').returns(additionalLanguages);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get languages', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/languages');

  t.is(response.status, 200);
  t.deepEqual(response.body, allLanguages);
});

test.serial('should pass on error message', async (t) => {
  languages.getAllLanguages.throws(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/languages');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_LANGUAGES_ERROR',
  });
});

test.serial('should get missing languages', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/languages/missing');

  t.is(response.status, 200);
  t.deepEqual(response.body, missingLanguages);
});

test.serial('should pass on missing language error message', async (t) => {
  languages.getMissingLanguages.throws(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/languages/missing');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_MISSING_LANGUAGES_ERROR',
  });
});

test.serial('should get additional languages', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/languages/additional');

  t.is(response.status, 200);
  t.deepEqual(response.body, additionalLanguages);
});

test.serial('should pass on additional language error message', async (t) => {
  languages.getLanguagesNotInPontoon.throws(new Error('nope'));

  const response = await request(app)
    .get('/sentence-collector/languages/additional');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'GET_ADDITIONAL_LANGUAGES_ERROR',
  });
});
