import * as languages from '../actions/languages';
import languageReducer from './languages';

const mockLanguages = ['en', 'fr'];

const combineState = (fields) => {
  const initialState = languageReducer(undefined, {
    type: 'inexistant',
  });
  
  return {
    ...initialState,
    ...fields,
  };
};

test('should use initial state', async () => {
  const newState = languageReducer(combineState({}), {
    type: 'inexistant',
  });

  expect(newState).toEqual({
    stats: {
      all: {},
      user: {},
      userUnreviewed: {},
      totals: {
        total: 0,
        languages: 0,
      },
    },
    languages: [],
    allLanguages: [],
    pendingLanguages: false,
    lastStatsUpdate: 0,
    statsUpdating: false,
  });
});

test('should reduce getting stats', async () => {
  const newState = languageReducer(combineState({}), {
    type: languages.ACTION_GET_STATS,
  });

  expect(newState.statsUpdating).toEqual(true);
});

test('should reduce stats', async () => {
  const stats = [{ foo: 'bar' }];
  const newState = languageReducer(combineState({}), {
    type: languages.ACTION_GOT_STATS,
    stats,
  });

  expect(newState.stats).toEqual(stats);
  expect(newState.lastStatsUpdate).not.toBe(null);
  expect(newState.statsUpdating).toEqual(false);
});

test('should reduce stats status reset', async () => {
  const newState = languageReducer(combineState({ statsUpdating: true }), {
    type: languages.ACTION_RESET_STATS_STATUS,
  });

  expect(newState.statsUpdating).toEqual(false);
});

test('should reduce languages', async () => {
  const newState = languageReducer(combineState({}), {
    type: languages.ACTION_GOT_LANGUAGES,
    languages: mockLanguages,
  });

  expect(newState.allLanguages).toEqual(mockLanguages);
});

test('should reduce add language request', async () => {
  const newState = languageReducer(combineState({}), {
    type: languages.ACTION_ADD_LANGUAGE_REQUEST,
  });

  expect(newState.pendingLanguages).toEqual(true);
});

test('should reduce add languages', async () => {
  const newState = languageReducer(combineState({ pendingLanguages: true }), {
    type: languages.ACTION_ADD_LANGUAGE_SUCCESS,
    languages: mockLanguages,
  });

  expect(newState.languages).toEqual(mockLanguages);
  expect(newState.pendingLanguages).toEqual(false);
});

test('should reduce add language failure', async () => {
  const newState = languageReducer(combineState({ pendingLanguages: true }), {
    type: languages.ACTION_ADD_LANGUAGE_FAILURE,
  });

  expect(newState.pendingLanguages).toEqual(false);
});

test('should reduce remove language request', async () => {
  const newState = languageReducer(combineState({}), {
    type: languages.ACTION_REMOVE_LANGUAGE_REQUEST,
  });

  expect(newState.pendingLanguages).toEqual(true);
});

test('should reduce remove languages', async () => {
  const newState = languageReducer(combineState({ pendingLanguages: true }), {
    type: languages.ACTION_REMOVE_LANGUAGE_SUCCESS,
    languages: mockLanguages,
  });

  expect(newState.languages).toEqual(mockLanguages);
  expect(newState.pendingLanguages).toEqual(false);
});

test('should reduce remove language failure', async () => {
  const newState = languageReducer(combineState({ pendingLanguages: true }), {
    type: languages.ACTION_REMOVE_LANGUAGE_FAILURE,
  });

  expect(newState.pendingLanguages).toEqual(false);
});
