import WebDB from '../web-db';

export const ACTION_ADD_LANGUAGE_REQUEST = 'ADD_LANGUAGE_REQUEST';
export const ACTION_ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS';
export const ACTION_ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE';

export const ACTION_REMOVE_LANGUAGE_REQUEST = 'REMOVE_LANGUAGE_REQUEST';
export const ACTION_REMOVE_LANGUAGE_SUCCESS = 'REMOVE_LANGUAGE_SUCCESS';
export const ACTION_REMOVE_LANGUAGE_FAILURE = 'REMOVE_LANGUAGE_FAILURE';

export function addLanguage(language) {
  return async function(dispatch, getState) {
    try {
      dispatch(sendAddLanguage());

      const state = getState();
      const db = new WebDB(state.login.username, state.login.password);
      const updatedLanguages = await db.addLanguage(language);
      dispatch(addLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(addLanguageFailure());
      throw err;
    }
  };
}

export function removeLanguage(language) {
  return async function(dispatch, getState) {
    try {
      dispatch(sendRemoveLanguage());

      const state = getState();
      const db = new WebDB(state.login.username, state.login.password);
      const updatedLanguages = await db.removeLanguage(language);
      dispatch(removeLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(removeLanguageFailure());
      throw err;
    }
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
