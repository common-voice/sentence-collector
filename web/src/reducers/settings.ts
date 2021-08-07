import type { AnyAction } from 'redux';

import { ACTION_SETTINGS_CHANGED, ACTION_SETTINGS_CHANGED_FAILURE } from '../actions/settings';

export type SettingsState = {
  errorMessage: string;
};

export const INITIAL_STATE: SettingsState = {
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action: AnyAction): SettingsState {
  switch (action.type) {
    case ACTION_SETTINGS_CHANGED:
      return Object.assign({}, state, action.newSettings, {
        errorMessage: '',
      });

    case ACTION_SETTINGS_CHANGED_FAILURE:
      return Object.assign({}, state, {
        errorMessage: 'Could not change settings. Please try again.',
      });

    default:
      return state;
  }
}
