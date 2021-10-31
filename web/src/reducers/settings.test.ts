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
    showErrorMessage: false,
  });
});

test('should reduce settings changed success', async () => {
  const newSettings = {};
  const newState = settingsReducer(combineState({ showErrorMessage: true }), {
    type: settings.ACTION_SETTINGS_CHANGED,
    newSettings,
  });

  expect(newState.showErrorMessage).toBeFalsy();
});

test('should reduce settings changed error', async () => {
  const newState = settingsReducer(combineState({}), {
    type: settings.ACTION_SETTINGS_CHANGED_FAILURE,
  });

  expect(newState.showErrorMessage).toBeTruthy();
});
