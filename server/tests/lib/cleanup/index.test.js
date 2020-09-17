import test from 'ava';
import sinon from 'sinon';
import en from '../../../lib/cleanup/languages/en';
import cleanup from '../../../lib/cleanup';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(en, 'sortSentences');
  t.context.sandbox.stub(en, 'clean');
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('sorts and cleans sentences', (t) => {
  cleanup.cleanupSentences('en', ['hi']);
  t.true(en.sortSentences.called);
  t.true(en.clean.called);
});

test.serial('falls back to English', (t) => {
  cleanup.cleanupSentences('inexisting_language', ['hi']);
  t.true(en.sortSentences.called);
  t.true(en.clean.called);
});
