import WebDB from '../web-db';

export const ACTION_SETTINGS_CHANGED = 'ACTION_SETTINGS_CHANGED';
export const ACTION_SETTINGS_CHANGED_FAILURE = 'ACTION_SETTINGS_CHANGED_FAILURE';

export function setSetting(key, value) {
  return async function(dispatch, getState) {
    try {
      const state = getState();
      const db = new WebDB(state.login.username, state.login.password);
      await db.setSetting(key, value);
      dispatch(settingsChanged({
        [key]: value,
      }));
    } catch (err) {
      dispatch(settingsChangedFailure());
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
