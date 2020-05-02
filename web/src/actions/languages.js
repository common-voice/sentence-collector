import { getDBInstance } from '../web-db';
import { sendRequest } from '../backend';

export const ACTION_ADD_LANGUAGE_REQUEST = 'ADD_LANGUAGE_REQUEST';
export const ACTION_ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS';
export const ACTION_ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE';

export const ACTION_REMOVE_LANGUAGE_REQUEST = 'REMOVE_LANGUAGE_REQUEST';
export const ACTION_REMOVE_LANGUAGE_SUCCESS = 'REMOVE_LANGUAGE_SUCCESS';
export const ACTION_REMOVE_LANGUAGE_FAILURE = 'REMOVE_LANGUAGE_FAILURE';

export const ACTION_GOT_LANGUAGES = 'ACTION_GOT_LANGUAGES';

export function getLanguages() {
  return async function(dispatch) {
    try {
      const languages = await sendRequest('languages');
      dispatch(gotLanguages(languages));
    } catch (error) {
      console.error('Failed to fetch languages', error);
    }
  };
}

export function addLanguage(language) {
  return async function(dispatch) {
    try {
      dispatch(sendAddLanguage());

      const db = getDBInstance();
      const updatedLanguages = await db.addLanguage(language);
      dispatch(addLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(addLanguageFailure());
      throw err;
    }
  };
}

export function removeLanguage(language) {
  return async function(dispatch) {
    try {
      dispatch(sendRemoveLanguage());

      const db = getDBInstance();
      const updatedLanguages = await db.removeLanguage(language);
      dispatch(removeLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(removeLanguageFailure());
      throw err;
    }
  };
}

export function gotLanguages(languages) {
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

export function addLanguageSuccess(languages) {
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

export function removeLanguageSuccess(languages) {
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
