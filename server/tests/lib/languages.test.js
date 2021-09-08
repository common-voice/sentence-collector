import test from 'ava';
import ISO6391 from 'iso-639-1';
import nock from 'nock';
import sinon from 'sinon';
import languages from '../../lib/languages';
import { Sentence } from '../../lib/models';

const inexistingLanguageCode = 'inexisting_language_code';
const languagesResponse = [{
  locale: {
    code: 'en',
  },
}, {
  locale: {
    code: inexistingLanguageCode,
  },
}];

test.before((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.spy(ISO6391, 'getLanguages');
  t.context.sandbox.stub(Sentence, 'aggregate').resolves([{
    DISTINCT: 'en', // exists
  }, {
    DISTINCT: 'missing', // does not exists
  }]);
});

test.after.always((t) => {
  t.context.sandbox.restore();
});

test('gets ISO and custom languages', (t) => {
  const allLanguages = languages.getAllLanguages();
  t.true(allLanguages.length > 31);
  const languageToCheck = allLanguages.find((lang) => lang.id === 'bxr');
  t.deepEqual(languageToCheck, {
    id: 'bxr',
    name: 'Russia Buriat',
    nativeName: 'буряад хэлэн',
  });

  const removedLanguageCheck = allLanguages.find((lang) => lang.code === 'zh');
  t.falsy(removedLanguageCheck);
});

test('returns missing languages', async (t) => {
  nock('https://pontoon.mozilla.org')
    .post('/graphql')
    .reply(200, {
      data: {
        project: {
          localizations: languagesResponse,
        },
      },
    });

  const missingLanguages = await languages.getMissingLanguages();
  t.deepEqual(missingLanguages, [inexistingLanguageCode]);
});

test('returns additional languages', async (t) => {
  nock('https://pontoon.mozilla.org')
    .post('/graphql')
    .reply(200, {
      data: {
        project: {
          localizations: [languagesResponse[0]],
        },
      },
    });

  const missingLanguages = await languages.getLanguagesNotInPontoon();
  t.deepEqual(missingLanguages, ['missing']);
});
