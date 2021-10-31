import type { AnyAction } from 'redux';

import { ACTION_SETTINGS_CHANGED, ACTION_SETTINGS_CHANGED_FAILURE } from '../actions/settings';

export type SettingsState = {
  showErrorMessage: boolean;
};

export const INITIAL_STATE: SettingsState = {
  showErrorMessage: false,
};

export default function (state = INITIAL_STATE, action: AnyAction): SettingsState {
  switch (action.type) {
    case ACTION_SETTINGS_CHANGED:
      return Object.assign({}, state, action.newSettings, {
        errorMessage: '',
        showErrorMessage: false,
      });

    case ACTION_SETTINGS_CHANGED_FAILURE:
      return Object.assign({}, state, {
        showErrorMessage: true,
      });

    default:
      return state;
  }
}
