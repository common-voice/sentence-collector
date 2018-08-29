import {
  ACTION_LOGOUT,
  ACTION_LOGIN_REQUEST,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAILURE,
  ACTION_ADD_LANGUAGE_REQUEST,
  ACTION_ADD_LANGUAGE_SUCCESS,
  ACTION_ADD_LANGUAGE_FAILURE
} from '../actions';

export const INITIAL_STATE = {
  authed: false,
  pendingAuth: false,
  username: null,
  password: null,
  languages: [],
  pendingLanguages: false,
};

function copyInto(oldObj, newObj) {
  return Object.assign({}, oldObj, newObj);
}

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_LOGOUT:
    case ACTION_LOGIN_FAILURE:
      return INITIAL_STATE;

    case ACTION_LOGIN_SUCCESS:
      return  copyInto(state, {
        authed: true,
        pendingAuth: false,
        username: action.username,
        password: action.password,
        languages: action.languages,
      });

    case ACTION_LOGIN_REQUEST:
      return copyInto(state, {
        authed: false,
        pendingAuth: true,
      });

    case ACTION_ADD_LANGUAGE_REQUEST:
      return copyInto(state, {
        pendingLanguages: true,
      });

    case ACTION_ADD_LANGUAGE_SUCCESS:
      return copyInto(state, {
        pendingLanguages: false,
        languages: action.languages,
      });

    case ACTION_ADD_LANGUAGE_FAILURE:
      return copyInto(state, {
        pendingLanguages: false,
      });

    default:
      return state;
  }
}

