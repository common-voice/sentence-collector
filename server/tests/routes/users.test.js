import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app';
import users from '../../lib/users';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(users, 'updateSetting').resolves();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('whoami: should return 404 when no user', async (t) => {
  const response = await request(app)
    .get('/users/whoami');

  t.is(response.status, 404);
});

test.serial('updateSetting: should update setting', async (t) => {
  const response = await request(app)
    .post('/users/settings')
    .send({ key: 'foo', value: 'bar' });

  t.is(response.status, 200);
  t.true(users.updateSetting.calledWith(undefined, 'foo', 'bar'));
});

test.serial('updateSetting: should pass error', async (t) => {
  users.updateSetting.rejects(new Error('nope'));

  const response = await request(app)
    .post('/users/settings')
    .send({ key: 'foo', value: 'bar' });

  t.is(response.status, 500);
  t.deepEqual(response.body, {
    message: 'nope',
  });
});
