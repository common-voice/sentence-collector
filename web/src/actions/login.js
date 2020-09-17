import { sendRequest } from '../backend';
import { addLanguageSuccess, getStats } from './languages';
import { settingsChanged } from './settings';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_NOT_LOGGED_IN = 'NOT_LOGGED_IN';
export const ACTION_USER_INFO_RECEIVED = 'USER_INFO_RECEIVED';
export const ACTION_USER_MIGRATION_START = 'USER_MIGRATION_START';
export const ACTION_USER_MIGRATION_SUCCESS = 'USER_MIGRATION_SUCCESS';
export const ACTION_USER_MIGRATION_FAILURE = 'USER_MIGRATION_FAILURE';

export function afterLogin() {
  return async function(dispatch) {
    dispatch(loginSuccess());
  };
}

export function checkCurrentUser() {
  return async function(dispatch) {
    try {
      const userInfo = await sendRequest('users/whoami');
      dispatch(userInfoReceived(userInfo));
      dispatch(addLanguageSuccess(userInfo.languages));
      dispatch(settingsChanged(userInfo.settings));
      dispatch(getStats(userInfo.languages));
    } catch (error) {
      dispatch(logoutSuccess());
    }
  };
}

export function migrate(credentials) {
  return async function(dispatch) {
    try {
      dispatch(migrationStart());
      await sendRequest('users/migrate', 'POST', credentials);
      dispatch(migrationSuccess());
      dispatch(checkCurrentUser());
    } catch (error) {
      dispatch(migrationFailure());
    }
  };
}

export function logout() {
  return async function(dispatch) {
    dispatch(logoutSuccess());
  };
}

export function logoutSuccess() {
  return {
    type: ACTION_LOGOUT,
  };
}

export function loginSuccess() {
  return {
    type: ACTION_LOGIN_SUCCESS,
  };
}

export function userInfoReceived(userInfo) {
  return {
    type: ACTION_USER_INFO_RECEIVED,
    username: userInfo.email,
  };
}

export function migrationStart(credentials) {
  return {
    type: ACTION_USER_MIGRATION_START,
    credentials,
  };
}

export function migrationSuccess() {
  return {
    type: ACTION_USER_MIGRATION_SUCCESS,
  };
}

export function migrationFailure() {
  return {
    type: ACTION_USER_MIGRATION_FAILURE,
    errorMessage: 'Migration failed. Make sure you entered the correct credentials and try again.',
  };
}
