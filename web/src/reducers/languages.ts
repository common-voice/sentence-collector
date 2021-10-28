import type { AnyAction } from 'redux';

import {
  ACTION_ADD_LANGUAGE_REQUEST,
  ACTION_ADD_LANGUAGE_SUCCESS,
  ACTION_ADD_LANGUAGE_FAILURE,
  ACTION_REMOVE_LANGUAGE_REQUEST,
  ACTION_REMOVE_LANGUAGE_SUCCESS,
  ACTION_REMOVE_LANGUAGE_FAILURE,
  ACTION_GOT_LANGUAGES,
  ACTION_GET_STATS,
  ACTION_GOT_STATS,
  ACTION_RESET_STATS_STATUS,
  ACTION_SET_CURRENT_UI_LOCALE,
} from '../actions/languages';
import { DEFAULT_LOCALE } from '../l10n';
import type { Language, LanguageStats } from '../types';

export type LanguageState = {
  stats: LanguageStats;
  languages: string[];
  allLanguages: Language[];
  pendingLanguages: boolean;
  lastStatsUpdate: number;
  statsUpdating: boolean;
  currentUILocale: string;
};

export const INITIAL_STATE: LanguageState = {
  stats: {
    all: {},
    userUnreviewed: {},
    totals: {
      total: 0,
      languages: 0,
    },
  },
  languages: [],
  allLanguages: [],
  pendingLanguages: false,
  lastStatsUpdate: 0,
  statsUpdating: false,
  currentUILocale: DEFAULT_LOCALE,
};

export default function (state = INITIAL_STATE, action: AnyAction): LanguageState {
  switch (action.type) {
    case ACTION_GET_STATS:
      return Object.assign({}, state, {
        statsUpdating: true,
      });

    case ACTION_GOT_STATS:
      return Object.assign({}, state, {
        stats: action.stats,
        lastStatsUpdate: Date.now(),
        statsUpdating: false,
      });

    case ACTION_RESET_STATS_STATUS:
      return Object.assign({}, state, {
        statsUpdating: false,
      });

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
