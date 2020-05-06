import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import languages from '../../lib/languages';

const allLanguages = [{
  code: 'en',
  name: 'English',
  nativeName: 'English',
}, {
  code: 'de',
  name: 'German',
  nativeName: 'Deutsch',
}];

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(languages, 'getAllLanguages').returns(allLanguages);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should get languages', async (t) => {
  const response = await request(app)
    .get('/languages');

  t.is(response.status, 200);
  t.deepEqual(response.body, allLanguages);
});

test.serial('should pass on error message', async (t) => {
  languages.getAllLanguages.throws(new Error('nope'));

  const response = await request(app)
    .get('/languages');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});
