import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { sendRequest } from '../backend';
import type { Language, RootState } from '../types';

export const ACTION_ADD_LANGUAGE_REQUEST = 'ADD_LANGUAGE_REQUEST';
export const ACTION_ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS';
export const ACTION_ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE';

export const ACTION_REMOVE_LANGUAGE_REQUEST = 'REMOVE_LANGUAGE_REQUEST';
export const ACTION_REMOVE_LANGUAGE_SUCCESS = 'REMOVE_LANGUAGE_SUCCESS';
export const ACTION_REMOVE_LANGUAGE_FAILURE = 'REMOVE_LANGUAGE_FAILURE';

export const ACTION_GOT_LANGUAGES = 'ACTION_GOT_LANGUAGES';
export const ACTION_GET_LANGUAGES_FAILURE = 'ACTION_GET_LANGUAGES_FAILURE';

export const ACTION_SET_CURRENT_UI_LOCALE = 'ACTION_SET_CURRENT_UI_LOCALE';

export function getLanguages(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch) {
    try {
      const languages = await sendRequest<Language[]>('languages');
      dispatch(gotLanguages(languages));
    } catch (error) {
      console.error('Failed to fetch languages', error);
      dispatch(getLanguagesFailure());
    }
  };
}

export function addLanguage(language: string): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function (dispatch) {
    try {
      dispatch(sendAddLanguage());
      const updatedLanguages = await sendRequest<Language[]>('users/languages', 'PUT', {
        language,
      });
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
      const updatedLanguages = await sendRequest<Language[]>(
        `users/languages/${language}`,
        'DELETE'
      );
      dispatch(removeLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(removeLanguageFailure());
      throw err;
    }
  };
}

export function gotLanguages(languages: Language[]) {
  return {
    type: ACTION_GOT_LANGUAGES,
    languages,
  };
}

export function getLanguagesFailure() {
  return {
    type: ACTION_GET_LANGUAGES_FAILURE,
  };
}

export function sendAddLanguage() {
  return {
    type: ACTION_ADD_LANGUAGE_REQUEST,
  };
}

export function addLanguageSuccess(languages: Language[]) {
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

export function removeLanguageSuccess(languages: Language[]) {
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

export function setCurrentLocale(locale: string) {
  return {
    type: ACTION_SET_CURRENT_UI_LOCALE,
    locale,
  };
}
