import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { sendRequest } from '../backend';
import type { Language, LanguageStats, RootState } from '../types';

export const ACTION_ADD_LANGUAGE_REQUEST = 'ADD_LANGUAGE_REQUEST';
export const ACTION_ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS';
export const ACTION_ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE';

export const ACTION_REMOVE_LANGUAGE_REQUEST = 'REMOVE_LANGUAGE_REQUEST';
export const ACTION_REMOVE_LANGUAGE_SUCCESS = 'REMOVE_LANGUAGE_SUCCESS';
export const ACTION_REMOVE_LANGUAGE_FAILURE = 'REMOVE_LANGUAGE_FAILURE';

export const ACTION_GOT_LANGUAGES = 'ACTION_GOT_LANGUAGES';
export const ACTION_GET_STATS = 'ACTION_GET_STATS';
export const ACTION_GOT_STATS = 'ACTION_GOT_STATS';
export const ACTION_RESET_STATS_STATUS = 'ACTION_RESET_STATS_STATUS';

const UPDATE_FREQUENCY_MS = 6 * 60 * 60 * 1000;

export function getStats(
  locales: string[],
  lastUpdate?: number
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch) {
    if (lastUpdate && Date.now() - lastUpdate < UPDATE_FREQUENCY_MS) {
      dispatch(resetStatsStatus());
      return;
    }

    dispatch(gettingStats());
    const joinedLocales = locales.join(',');
    try {
      const stats = await sendRequest<LanguageStats>(`stats?locales=${joinedLocales}`);
      dispatch(gotStats(stats));
    } catch (error) {
      console.error('Failed to fetch stats', error);
      dispatch(resetStatsStatus());
    }
  };
}

export function getLanguages(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch) {
    try {
      const languages = await sendRequest<Language[]>('languages');
      dispatch(gotLanguages(languages));
    } catch (error) {
      console.error('Failed to fetch languages', error);
    }
  };
}

export function addLanguage(language: string): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch) {
    try {
      dispatch(sendAddLanguage());
      const updatedLanguages = await sendRequest<string[]>('users/languages', 'PUT', { language });
      dispatch(addLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(addLanguageFailure());
      throw err;
    }
  };
}

export function removeLanguage(language: string): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch) {
    try {
      dispatch(sendRemoveLanguage());
      const updatedLanguages = await sendRequest<string[]>(`users/languages/${language}`, 'DELETE');
      dispatch(removeLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(removeLanguageFailure());
      throw err;
    }
  };
}

export function gettingStats() {
  return {
    type: ACTION_GET_STATS,
  };
}

export function gotStats(stats: LanguageStats) {
  return {
    type: ACTION_GOT_STATS,
    stats,
  };
}

export function resetStatsStatus() {
  return {
    type: ACTION_RESET_STATS_STATUS,
  };
}

export function gotLanguages(languages: Language[]) {
  return {
    type: ACTION_GOT_LANGUAGES,
    languages,
  };
}

export function sendAddLanguage() {
  return {
    type: ACTION_ADD_LANGUAGE_REQUEST,
  };
}

export function addLanguageSuccess(languages: string[]) {
  return {
    type: ACTION_ADD_LANGUAGE_SUCCESS,
    languages,
  };
}

export function addLanguageFailure() {
  return {
    type: ACTION_ADD_LANGUAGE_FAILURE,
  };
}

export function sendRemoveLanguage() {
  return {
    type: ACTION_REMOVE_LANGUAGE_REQUEST,
  };
}

export function removeLanguageSuccess(languages: string[]) {
  return {
    type: ACTION_REMOVE_LANGUAGE_SUCCESS,
    languages,
  };
}

export function removeLanguageFailure() {
  return {
    type: ACTION_REMOVE_LANGUAGE_FAILURE,
  };
}
