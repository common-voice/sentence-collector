import * as languages from '../../src/actions/languages';
import languageReducer from '../../src/reducers/languages';

const mockLanguages = ['en', 'fr'];

test('should use initial state', async () => {
  const newState = languageReducer(undefined, {
    type: 'inexistant',
  });

  expect(newState).toEqual({
    stats: [],
    languages: [],
    allLanguages: [],
    pendingLanguages: false,
    lastStatsUpdate: null,
    statsUpdating: false,
  });
});

test('should reduce languages', async () => {
  const newState = languageReducer({}, {
    type: languages.ACTION_GOT_LANGUAGES,
    languages: mockLanguages,
  });

  expect(newState.allLanguages).toEqual(mockLanguages);
});
