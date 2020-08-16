import test from 'ava';
import sinon from 'sinon';
import { User } from '../../lib/models';
import users from '../../lib/users';

const exampleUserRecord = {
  email: 'foo@example.com',
  useSwipeReview: true,
};

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(User, 'findAll').resolves([exampleUserRecord]);
  t.context.sandbox.stub(User, 'findOrCreate').resolves([exampleUserRecord, true]);
  t.context.sandbox.stub(User, 'update').resolves(exampleUserRecord);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('createUserIfNecessary: should create user if necessary', async (t) => {
  await users.createUserIfNecessary('foo@example.com');
  t.true(User.findOrCreate.called);
});

test.serial('get: should get user', async (t) => {
  const user = await users.get('foo@example.com');
  t.deepEqual(user, {
    email: 'foo@example.com',
    settings: {
      useSwipeReview: true,
    },
  });
});

test.serial('updateSetting: should update user', async (t) => {
  await users.updateSetting('foo@example.com', 'useSwipeReview', true);
  t.true(User.update.calledWith({
    useSwipeReview: true,
  }, {
    where: {
      email: 'foo@example.com',
    },
  }));
});

test.serial('updateSetting: should error when missing user', (t) => {
  const error = t.throws(() => users.updateSetting());
  t.is(error.message, 'MISSING_USER');
});

test.serial('updateSetting: should error when missing key', (t) => {
  const error = t.throws(() => users.updateSetting('foo@example.com', undefined, true));
  t.is(error.message, 'MISSING_SETTINGS_KEY_OR_VALUE');
});
