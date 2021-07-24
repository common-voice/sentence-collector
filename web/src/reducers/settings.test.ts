import * as settings from '../actions/settings';
import settingsReducer from './settings';

const combineState = (fields: Record<string, unknown>) => {
  const initialState = settingsReducer(undefined, {
    type: 'inexistant',
  });

  return {
    ...initialState,
    ...fields,
  };
};

test('should use initial state', async () => {
  const newState = settingsReducer(combineState({}), {
    type: 'inexistant',
  });

  expect(newState).toEqual({
    errorMessage: '',
  });
});

test('should reduce settings changed success', async () => {
  const newSettings = {};
  const newState = settingsReducer(combineState({ errorMessage: 'oh no!' }), {
    type: settings.ACTION_SETTINGS_CHANGED,
    newSettings,
  });

  expect(newState.errorMessage).toEqual('');
});

test('should reduce settings changed error', async () => {
  const newState = settingsReducer(combineState({}), {
    type: settings.ACTION_SETTINGS_CHANGED_FAILURE,
  });

  expect(newState.errorMessage).toEqual('Could not change settings. Please try again.');
});
