import test from 'ava';
import nock from 'nock';
import sinon from 'sinon';
import languages from '../../lib/languages';
import { Sentence } from '../../lib/models';

const inexistingLanguageCode = 'inexisting_language_code';
const languagesResponse = [{
  locale: {
    code: 'de',
  },
}, {
  locale: {
    code: inexistingLanguageCode,
  },
}];

test.before((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(Sentence, 'aggregate').resolves([{
    DISTINCT: 'en', // exists
  }, {
    DISTINCT: 'missing', // does not exists
  }]);
});

test.after.always((t) => {
  t.context.sandbox.restore();
});

test('returns languages', async (t) => {
  nock('https://pontoon.mozilla.org')
    .post('/graphql')
    .reply(200, {
      data: {
        project: {
          localizations: languagesResponse,
        },
      },
    });

  const allLanguages = await languages.getAllLanguages();
  t.deepEqual(allLanguages.length, 3);
  const languageToCheck = allLanguages.find((lang) => lang.id === 'en');
  t.deepEqual(languageToCheck, {
    id: 'en',
    nativeName: 'English',
  });
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
