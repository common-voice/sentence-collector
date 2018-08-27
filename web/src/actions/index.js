import DB from '../../../shared/db';
import { getDatabaseUrl } from '../config';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN_REQUEST = 'LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'LOGIN_FAILURE';

export function login(username, password) {
  return async function (dispatch) {
    dispatch(sendLoginRequest());

    const db = new DB(getDatabaseUrl(), username, password);
    const authed = await db.auth();
    dispatch(authed ? loginSuccess(username, password) : loginFailure());
    return authed;
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

export function loginSuccess(username, password) {
  return {
    type: ACTION_LOGIN_SUCCESS,
    username,
    password,
  };
}

export function loginFailure() {
  return {
    type: ACTION_LOGIN_FAILURE,
  };
}

export function addLanguage() {
  // ??
}
