import type { AnyAction } from 'redux';

import {
  ACTION_ADD_LANGUAGE_REQUEST,
  ACTION_ADD_LANGUAGE_SUCCESS,
  ACTION_ADD_LANGUAGE_FAILURE,
  ACTION_REMOVE_LANGUAGE_REQUEST,
  ACTION_REMOVE_LANGUAGE_SUCCESS,
  ACTION_REMOVE_LANGUAGE_FAILURE,
  ACTION_GOT_LANGUAGES,
  ACTION_SET_CURRENT_UI_LOCALE,
} from '../actions/languages';
import { DEFAULT_LOCALE } from '../l10n';
import type { Language } from '../types';

export type LanguageState = {
  languages: Language[];
  allLanguages: Language[];
  pendingLanguages: boolean;
  currentUILocale: string;
};

export const INITIAL_STATE: LanguageState = {
  languages: [],
  allLanguages: [],
  pendingLanguages: false,
  currentUILocale: DEFAULT_LOCALE,
};

export default function (state = INITIAL_STATE, action: AnyAction): LanguageState {
  switch (action.type) {
    case ACTION_GOT_LANGUAGES:
      return Object.assign({}, state, {
        allLanguages: action.languages,
      });

    case ACTION_ADD_LANGUAGE_REQUEST:
      return Object.assign({}, state, {
        pendingLanguages: true,
      });

    case ACTION_ADD_LANGUAGE_SUCCESS:
      return Object.assign({}, state, {
        pendingLanguages: false,
        languages: action.languages,
      });

    case ACTION_ADD_LANGUAGE_FAILURE:
      return Object.assign({}, state, {
        pendingLanguages: false,
      });

    case ACTION_REMOVE_LANGUAGE_REQUEST:
      return Object.assign({}, state, {
        pendingLanguages: true,
      });

    case ACTION_REMOVE_LANGUAGE_SUCCESS:
      return Object.assign({}, state, {
        pendingLanguages: false,
        languages: action.languages,
      });

    case ACTION_REMOVE_LANGUAGE_FAILURE:
      return Object.assign({}, state, {
        pendingLanguages: false,
      });

    case ACTION_SET_CURRENT_UI_LOCALE:
      return Object.assign({}, state, {
        currentUILocale: action.locale,
      });

    default:
      return state;
  }
}
