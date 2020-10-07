import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import users from '../../lib/users';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(users, 'updateSetting').resolves();
  t.context.sandbox.stub(users, 'addLanguage').resolves(['en']);
  t.context.sandbox.stub(users, 'removeLanguage').resolves(['en']);
  t.context.sandbox.stub(users, 'migrate').resolves();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('whoami: should return 404 when no user', async (t) => {
  const response = await request(app)
    .get('/sentence-collector/users/whoami');

  t.is(response.status, 404);
});

test.serial('updateSetting: should update setting', async (t) => {
  const response = await request(app)
    .post('/sentence-collector/users/settings')
    .send({ key: 'foo', value: 'bar' });

  t.is(response.status, 200);
  t.true(users.updateSetting.calledWith(undefined, 'foo', 'bar'));
});

test.serial('updateSetting: should pass error', async (t) => {
  users.updateSetting.rejects(new Error('nope'));

  const response = await request(app)
    .post('/sentence-collector/users/settings')
    .send({ key: 'foo', value: 'bar' });

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('addLanguage: should update languages', async (t) => {
  const response = await request(app)
    .put('/sentence-collector/users/languages')
    .send({ language: 'en' });

  t.is(response.status, 200);
  t.true(users.addLanguage.calledWith(undefined, 'en'));
  t.deepEqual(response.body, ['en']);
});

test.serial('addLanguage: should pass error', async (t) => {
  users.addLanguage.rejects(new Error('nope'));

  const response = await request(app)
    .put('/sentence-collector/users/languages')
    .send({ language: 'en' });

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('removeLanguage: should update languages', async (t) => {
  const response = await request(app)
    .delete('/sentence-collector/users/languages/en');

  t.is(response.status, 200);
  t.true(users.removeLanguage.calledWith(undefined, 'en'));
  t.deepEqual(response.body, ['en']);
});

test.serial('removeLanguage: should pass error', async (t) => {
  users.removeLanguage.rejects(new Error('nope'));

  const response = await request(app)
    .delete('/sentence-collector/users/languages/en');

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});

test.serial('migrate: should migrate', async (t) => {
  const response = await request(app)
    .post('/sentence-collector/users/migrate')
    .send({ username: 'foo', password: 'bar' });

  t.is(response.status, 200);
  t.true(users.migrate.calledWith(undefined, 'foo', 'bar'));
});

test.serial('migrate: should pass error', async (t) => {
  users.migrate.rejects(new Error('nope'));

  const response = await request(app)
    .post('/sentence-collector/users/migrate')
    .send({ username: 'foo', password: 'bar' });

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});
