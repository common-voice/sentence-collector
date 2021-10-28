import type { AnyAction } from 'redux';
import { useLocalization } from '@fluent/react';

import { ACTION_SETTINGS_CHANGED, ACTION_SETTINGS_CHANGED_FAILURE } from '../actions/settings';

export type SettingsState = {
  errorMessage: string;
};

export const INITIAL_STATE: SettingsState = {
  errorMessage: '',
};

export default function (state = INITIAL_STATE, action: AnyAction): SettingsState {

  // FIXME : Uncaught Error: useLocalization was used without wrapping it in a <LocalizationProvider />.
  // const { l10n } = useLocalization();

  switch (action.type) {
    case ACTION_SETTINGS_CHANGED:
      return Object.assign({}, state, action.newSettings, {
        errorMessage: '',
      });

    // FIXME : Uncaught Error: useLocalization was used without wrapping it in a <LocalizationProvider />.
    case ACTION_SETTINGS_CHANGED_FAILURE:
      return Object.assign({}, state, {
        // errorMessage: l10n.getString('sc-red-settings-err'),
        errorMessage: 'Could not change settings. Please try again.',
      });

    default:
      return state;
  }
}
