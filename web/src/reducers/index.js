import {
  ACTION_LOGOUT,
  ACTION_LOGIN_REQUEST,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAILURE,
  ACTION_ADD_LANGUAGE_REQUEST,
  ACTION_ADD_LANGUAGE_SUCCESS,
  ACTION_ADD_LANGUAGE_FAILURE,
  ACTION_REMOVE_LANGUAGE_REQUEST,
  ACTION_REMOVE_LANGUAGE_SUCCESS,
  ACTION_REMOVE_LANGUAGE_FAILURE,
  ACTION_SUBMIT_SENTENCES_REQUEST,
  ACTION_SUBMIT_SENTENCES_SUCCESS,
  ACTION_SUBMIT_SENTENCES_FAILURE,
  ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE,
  ACTION_RESET_STATE,
} from '../actions';

import {
  ACTION_PARSE_SENTENCES_STARTED,
  ACTION_PARSE_SENTENCES_FINISHED,
  ACTION_PARSE_SENTENCES_FAILURE,
} from '../actions/parsing';

export const INITIAL_STATE = {
  authed: false,
  pendingAuth: false,
  username: null,
  password: null,
  languages: [],
  pendingLanguages: false,
  sentences: [],
  pendingSentences: false,
  parsingSentences: false,
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

export default function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_LOGOUT:
    case ACTION_LOGIN_FAILURE:
      return copyInto(state, INITIAL_STATE);

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
        pendingSentences: true,
        sentenceSubmissionFailures: [],
      });

    case ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE:
      return copyInto(state, {
        sentenceSubmissionFailures: action.errors,
      });

    case ACTION_SUBMIT_SENTENCES_SUCCESS:
      return copyInto(state, {
        pendingSentences: false,
        sentences: mergeArray(state.sentences, action.sentences),
      });

    case ACTION_SUBMIT_SENTENCES_FAILURE:
      return copyInto(state, {
        pendingSentences: false,
      });

    case ACTION_PARSE_SENTENCES_STARTED:
      return copyInto(state, {
        parsingSentences: true,
        errorMessage: null,
      });

    case ACTION_PARSE_SENTENCES_FINISHED:
      return copyInto(state, {
        parsingSentences: false,
      });

    case ACTION_PARSE_SENTENCES_FAILURE:
      return copyInto(state, {
        errorMessage: action.error.message,
      });

    case ACTION_RESET_STATE:
      return copyInto(state, INITIAL_STATE);

    default:
      return state;
  }
}
