import {
  getDBInstance,
  removeInstance,
} from '../web-db';
import { addLanguageSuccess, getStats } from './languages';
import { settingsChanged } from './settings';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN_REQUEST = 'LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'LOGIN_FAILURE';
export const ACTION_LOGIN_ENABLE = 'ACTION_LOGIN_ENABLE';
export const ACTION_LOGIN_DISABLE = 'ACTION_LOGIN_DISABLE';
export const ACTION_LOGIN_CHECK_USERNAME_FAILED = 'ACTION_LOGIN_CHECK_USERNAME_FAILED';
export const ACTION_LOGIN_CHECK_USERNAME_SUCCESS = 'ACTION_LOGIN_CHECK_USERNAME_SUCCESS';

const VALID_USERNAME_CHARACTERS = /^[a-zA-Z0-9]+$/;

export function login(username, password) {
  return async function(dispatch) {
    try {
      dispatch(sendLoginRequest());

      const db = getDBInstance(username, password);
      const user = await db.auth();
      dispatch(loginSuccess(username, password));
      dispatch(addLanguageSuccess(user.languages));
      dispatch(settingsChanged(user.settings));
      dispatch(getStats(username, user.languages));
    } catch (err) {
      console.log(err);
      dispatch(loginFailure());
    }
  };
}

export function checkLoginInput(username, password) {
  return async function(dispatch) {
    const validUsername = checkUsername(username);
    const validPassword = checkPassword(password);

    const usernameAction = validUsername ? usernameSuccess() : usernameFailure();
    dispatch(usernameAction);

    if (!validUsername || !validPassword) {
      return dispatch(disableLogin());
    }

    return dispatch(enableLogin());
  };
}

function checkUsername(username) {
  return VALID_USERNAME_CHARACTERS.test(username);
}

function checkPassword(password) {
  return password !== '';
}

export function usernameSuccess() {
  return {
    type: ACTION_LOGIN_CHECK_USERNAME_SUCCESS,
  };
}

export function usernameFailure() {
  return {
    type: ACTION_LOGIN_CHECK_USERNAME_FAILED,
  };
}

export function disableLogin() {
  return {
    type: ACTION_LOGIN_DISABLE,
  };
}

export function enableLogin() {
  return {
    type: ACTION_LOGIN_ENABLE,
  };
}

export function logout() {
  removeInstance();

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
