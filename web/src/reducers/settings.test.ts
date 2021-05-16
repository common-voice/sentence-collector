import * as settings from '../actions/settings';
import settingsReducer from './settings';

test('should use initial state', async () => {
  const newState = settingsReducer(undefined, {
    type: 'inexistant',
  });

  expect(newState).toEqual({
    errorMessage: '',
  });
});

test('should reduce settings changed success', async () => {
  const newSettings = {
    newSettingA: 'foo',
    newSettingB: 0,
  };
  const newState = settingsReducer({ errorMessage: 'oh no!' }, {
    type: settings.ACTION_SETTINGS_CHANGED,
    newSettings,
  });

  expect(newState.errorMessage).toEqual('');
  expect(newState.newSettingA).toEqual(newSettings.newSettingA);
  expect(newState.newSettingB).toEqual(newSettings.newSettingB);
});

test('should reduce settings changed error', async () => {
  const newState = settingsReducer({}, {
    type: settings.ACTION_SETTINGS_CHANGED_FAILURE,
  });

  expect(newState.errorMessage).toEqual('Could not change settings. Please try again.');
});
