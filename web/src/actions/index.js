import DB from '../../../shared/db';
import { getDatabaseUrl } from '../config';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN_REQUEST = 'LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'LOGIN_FAILURE';

export const ACTION_ADD_LANGUAGE_REQUEST = 'ADD_LANGUAGE_REQUEST';
export const ACTION_ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS';
export const ACTION_ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE';

function getDB(username, password) {
  return new DB(getDatabaseUrl(), username, password);
}

export function login(username, password) {
  return async function(dispatch) {
    try {
      dispatch(sendLoginRequest());

      const db = getDB(username, password);
      const user = await db.auth();
      dispatch(loginSuccess(username, password, user.languages));
    } catch (err) {
      dispatch(loginFailure());
      throw err;
    }
  };
}

export function addLanguage(language) {
  return async function(dispatch, getState) {
    try {
      dispatch(sendAddLanguage());

      const state = getState();
      const db = getDB(state.username, state.password);
      const updatedLanguages = await db.addLanguage(language);
      dispatch(addLanguageSuccess(updatedLanguages));
      return true;
    } catch (err) {
      dispatch(addLanguageFailure());
      throw err;
    }
  };
}

export function logout() {
  return {
    type: ACTION_LOGOUT,
  };
}

export function sendLoginRequest() {
  return {
    type: ACTION_LOGIN_REQUEST,
  };
}

export function loginSuccess(username, password, languages) {
  return {
    type: ACTION_LOGIN_SUCCESS,
    username,
    password,
    languages,
  };
}

export function loginFailure() {
  return {
    type: ACTION_LOGIN_FAILURE,
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

