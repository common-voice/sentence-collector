import test from 'ava';
import sinon from 'sinon';
import ISO6391 from 'iso-639-1';
import languages from '../../lib/languages';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.spy(ISO6391, 'getLanguages');
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test('gets ISO and custom languages', (t) => {
  const allLanguages = languages.getAllLanguages();
  t.true(allLanguages.length > 31);
  t.true(ISO6391.getLanguages.called);
  const languageToCheck = allLanguages.find((lang) => lang.id === 'bxr');
  t.deepEqual(languageToCheck, {
    id: 'bxr',
    name: 'Russia Buriat',
    nativeName: 'буряад хэлэн',
  });

  const removedLanguageCheck = allLanguages.find((lang) => lang.code === 'zh');
  t.falsy(removedLanguageCheck);
});