import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { sendRequest } from '../backend';
import type { RootState } from '../types';

export const ACTION_SETTINGS_CHANGED = 'ACTION_SETTINGS_CHANGED';
export const ACTION_SETTINGS_CHANGED_FAILURE = 'ACTION_SETTINGS_CHANGED_FAILURE';

type SettingsValue = string | boolean | number
type Settings = {
  useSwipeReview: boolean
}

export function setSetting(key: string, value: SettingsValue): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function(dispatch) {
    try {
      await sendRequest('users/settings', 'POST', { key, value });
      dispatch(settingsChanged({
        [key]: value,
      }));
    } catch (err) {
      dispatch(settingsChangedFailure());
      throw err;
    }
  };
}

export function settingsChanged(newSettings: Partial<Settings>) {
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
