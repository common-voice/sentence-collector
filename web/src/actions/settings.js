import { sendRequest } from '../backend';

export const ACTION_SETTINGS_CHANGED = 'ACTION_SETTINGS_CHANGED';
export const ACTION_SETTINGS_CHANGED_FAILURE = 'ACTION_SETTINGS_CHANGED_FAILURE';

export function setSetting(key, value) {
  return async function(dispatch) {
    try {
      await sendRequest('users/settings', 'POST', { key, value });
      dispatch(settingsChanged({
        [key]: value,
      }));
    } catch (err) {
      dispatch(settingsChangedFailure());
      console.error(err);
      throw err;
    }
  };
}

export function settingsChanged(newSettings) {
  return {
    type: ACTION_SETTINGS_CHANGED,
    newSettings,
  };
}

export function settingsChangedFailure() {
  return {
    type: ACTION_SETTINGS_CHANGED_FAILURE,
  };
}
