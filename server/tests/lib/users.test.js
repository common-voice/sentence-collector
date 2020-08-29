import test from 'ava';
import sinon from 'sinon';
import { User } from '../../lib/models';
import users from '../../lib/users';

const exampleUserRecord = {
  id: '1',
  email: 'foo@example.com',
  useSwipeReview: true,
  languages: '',
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
    id: '1',
    email: 'foo@example.com',
    languages: [],
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

test.serial('addLanguage: should add language to user - first language', async (t) => {
  const updatedLanguages = await users.addLanguage('foo@example.com', 'en');
  t.true(User.update.calledWith({
    languages: 'en',
  }, {
    where: {
      email: 'foo@example.com',
    },
  }));
  t.deepEqual(updatedLanguages, ['en']);
});

test.serial('addLanguage: should add language to user - second language', async (t) => {
  User.findAll.resolves([{
    email: 'foo@example.com',
    languages: 'en',
  }]);

  const updatedLanguages = await users.addLanguage('foo@example.com', 'fr');
  t.true(User.update.calledWith({
    languages: 'en,fr',
  }, {
    where: {
      email: 'foo@example.com',
    },
  }));
  t.deepEqual(updatedLanguages, ['en', 'fr']);
});

test.serial('addLanguage: should not do anything if already existing', async (t) => {
  User.findAll.resolves([{
    email: 'foo@example.com',
    languages: 'en',
  }]);

  const updatedLanguages = await users.addLanguage('foo@example.com', 'en');
  t.false(User.update.called);
  t.deepEqual(updatedLanguages, ['en']);
});

test.serial('removeLanguage: should remove language from user - first language', async (t) => {
  User.findAll.resolves([{
    email: 'foo@example.com',
    languages: 'en',
  }]);

  const updatedLanguages = await users.removeLanguage('foo@example.com', 'en');
  t.true(User.update.calledWith({
    languages: '',
  }, {
    where: {
      email: 'foo@example.com',
    },
  }));
  t.deepEqual(updatedLanguages, []);
});

test.serial('removeLanguage: should remove language from user - second language', async (t) => {
  User.findAll.resolves([{
    email: 'foo@example.com',
    languages: 'en,fr',
  }]);

  const updatedLanguages = await users.removeLanguage('foo@example.com', 'en');
  t.true(User.update.calledWith({
    languages: 'fr',
  }, {
    where: {
      email: 'foo@example.com',
    },
  }));
  t.deepEqual(updatedLanguages, ['fr']);
});

test.serial('removeLanguage: should not do anything if not existing', async (t) => {
  User.findAll.resolves([{
    email: 'foo@example.com',
    languages: 'en',
  }]);

  const updatedLanguages = await users.removeLanguage('foo@example.com', 'fr');
  t.false(User.update.called);
  t.deepEqual(updatedLanguages, ['en']);
});
