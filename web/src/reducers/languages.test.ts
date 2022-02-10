import * as languages from '../actions/languages';
import languageReducer from './languages';

const mockLanguages = ['en', 'fr'];

const combineState = (fields: Record<string, unknown>) => {
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
    languages: [],
    allLanguages: [],
    pendingLanguages: false,
    currentUILocale: 'en',
    fetchFailure: false,
  });
});

test('should reduce languages', async () => {
  const newState = languageReducer(combineState({}), {
    type: languages.ACTION_GOT_LANGUAGES,
    languages: mockLanguages,
  });

  expect(newState.allLanguages).toEqual(mockLanguages);
});

test('should reset fetch failure on successful fetch', async () => {
  const newState = languageReducer(combineState({ fetchFailure: true }), {
    type: languages.ACTION_GOT_LANGUAGES,
    languages: mockLanguages,
  });

  expect(newState.fetchFailure).toEqual(false);
});

test('should reduce language fetch error', async () => {
  const newState = languageReducer(combineState({}), {
    type: languages.ACTION_GET_LANGUAGES_FAILURE,
  });

  expect(newState.fetchFailure).toEqual(true);
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

test('should reduce ui language', async () => {
  const newState = languageReducer(combineState({}), {
    type: languages.ACTION_SET_CURRENT_UI_LOCALE,
    locale: 'de',
  });

  expect(newState.currentUILocale).toEqual('de');
});
