import {
  ACTION_LOGOUT,
  ACTION_LOGIN_REQUEST,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAILURE,
  ACTION_LOGIN_CHECK_USERNAME_FAILED,
  ACTION_LOGIN_ENABLE,
  ACTION_LOGIN_DISABLE,
  ACTION_LOGIN_CHECK_USERNAME_SUCCESS,
} from '../actions/login';

export const INITIAL_STATE = {
  authed: false,
  username: null,
  password: null,
  loginDisabled: true,
  errorMessage: null,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_LOGOUT:
      return Object.assign({}, state, INITIAL_STATE);

    case ACTION_LOGIN_CHECK_USERNAME_SUCCESS:
      return Object.assign({}, state, {
        errorMessage: null,
      });

    case ACTION_LOGIN_CHECK_USERNAME_FAILED:
      return Object.assign({}, state, INITIAL_STATE, {
        errorMessage: 'Please only use alphanumeric usernames.',
      });

    case ACTION_LOGIN_DISABLE:
      return Object.assign({}, state, {
        loginDisabled: true,
      });

    case ACTION_LOGIN_ENABLE:
      return Object.assign({}, state, {
        loginDisabled: false,
      });

    case ACTION_LOGIN_SUCCESS:
      return  Object.assign({}, state, {
        authed: true,
        loginDisabled: false,
        username: action.username,
        password: action.password,
        errorMessage: null,
      });

    case ACTION_LOGIN_FAILURE:
      return Object.assign({}, state, INITIAL_STATE, {
        errorMessage: 'Login failed.',
        loginDisabled: true,
      });

    case ACTION_LOGIN_REQUEST:
      return Object.assign({}, state, {
        authed: false,
        loginDisabled: true,
      });

    default:
      return state;
  }
}
