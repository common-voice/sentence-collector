import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  ACTION_LOGOUT,
  ACTION_LOGIN_REQUEST,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAILURE,
  ACTION_LOGIN_CHECK_USERNAME_FAILED,
  ACTION_LOGIN_ENABLE,
  ACTION_LOGIN_DISABLE,
  ACTION_LOGIN_CHECK_USERNAME_SUCCESS,
  ACTION_ADD_LANGUAGE_REQUEST,
  ACTION_ADD_LANGUAGE_SUCCESS,
  ACTION_ADD_LANGUAGE_FAILURE,
  ACTION_REMOVE_LANGUAGE_REQUEST,
  ACTION_REMOVE_LANGUAGE_SUCCESS,
  ACTION_REMOVE_LANGUAGE_FAILURE,
  ACTION_SUBMIT_SENTENCES_REQUEST,
  ACTION_SUBMIT_SENTENCES_SUCCESS,
  ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE,
  ACTION_SETTINGS_CHANGED,
  ACTION_SETTINGS_CHANGED_FAILURE,
} from '../actions';

import {
  ACTION_PARSE_SENTENCES_FAILURE,
} from '../actions/parsing';

export const INITIAL_STATE = {
  authed: false,
  username: null,
  password: null,
  loginDisabled: true,
  languages: [],
  pendingLanguages: false,
  sentences: [],
  errorMessage: null,
  sentenceSubmissionFailures: [],
};

function copyInto(oldObj, newObj) {
  return Object.assign({}, oldObj, newObj);
}

function mergeArray(arr1, arr2) {
  arr1 && arr1.forEach(item => (arr2.indexOf(item) === -1 && arr2.push(item)));
  return arr2;
}

export default function(history) {
  return combineReducers({
    router: connectRouter(history),
    app: reducer,
  });
}

function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_LOGOUT:
      return copyInto(state, INITIAL_STATE);

    case ACTION_LOGIN_CHECK_USERNAME_SUCCESS:
      return copyInto(state, {
        errorMessage: null,
      });

    case ACTION_LOGIN_CHECK_USERNAME_FAILED:
      return Object.assign({}, state, INITIAL_STATE, {
        errorMessage: 'Please only use alphanumeric usernames.',
      });

    case ACTION_LOGIN_DISABLE:
      return copyInto(state, {
        loginDisabled: true,
      });

    case ACTION_LOGIN_ENABLE:
      return copyInto(state, {
        loginDisabled: false,
      });

    case ACTION_LOGIN_SUCCESS:
      return  copyInto(state, {
        authed: true,
        loginDisabled: false,
        username: action.username,
        password: action.password,
        languages: action.languages,
        settings: action.settings,
        errorMessage: null,
      });

    case ACTION_LOGIN_FAILURE:
      return Object.assign({}, state, INITIAL_STATE, {
        errorMessage: 'Login failed.',
        loginDisabled: true,
      });

    case ACTION_LOGIN_REQUEST:
      return copyInto(state, {
        authed: false,
        loginDisabled: true,
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

    case ACTION_REMOVE_LANGUAGE_REQUEST:
      return copyInto(state, {
        pendingLanguages: true,
      });

    case ACTION_REMOVE_LANGUAGE_SUCCESS:
      return copyInto(state, {
        pendingLanguages: false,
        languages: action.languages,
      });

    case ACTION_REMOVE_LANGUAGE_FAILURE:
      return copyInto(state, {
        pendingLanguages: false,
      });

    case ACTION_SUBMIT_SENTENCES_REQUEST:
      return copyInto(state, {
        sentenceSubmissionFailures: [],
      });

    case ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE:
      return copyInto(state, {
        sentenceSubmissionFailures: action.errors,
      });

    case ACTION_SUBMIT_SENTENCES_SUCCESS:
      return copyInto(state, {
        sentences: mergeArray(state.sentences, action.sentences),
      });

    case ACTION_PARSE_SENTENCES_FAILURE:
      return copyInto(state, {
        errorMessage: action.error.message,
      });

    case ACTION_SETTINGS_CHANGED:
      return copyInto(
        state,
        {
          settings: copyInto(state.settings, action.newSettings),
        },
      );

    case ACTION_SETTINGS_CHANGED_FAILURE:
      return copyInto(state, {
        settingsChangedFailureMessage: 'Could not change settings. Please try again.',
      });

    default:
      return state;
  }
}
