import {
  ACTION_SUBMIT_SENTENCES_REQUEST,
  ACTION_SUBMIT_SENTENCES_SUCCESS,
  ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE,
} from '../actions/sentences';

import {
  ACTION_PARSE_SENTENCES_FAILURE,
} from '../actions/parsing';

export const INITIAL_STATE = {
  sentences: [],
  errorMessage: null,
  sentenceSubmissionFailures: [],
};

function mergeArray(arr1, arr2) {
  arr1 && arr1.forEach(item => (arr2.indexOf(item) === -1 && arr2.push(item)));
  return arr2;
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_SUBMIT_SENTENCES_REQUEST:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: [],
      });

    case ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: action.errors,
      });

    case ACTION_SUBMIT_SENTENCES_SUCCESS:
      return Object.assign({}, state, {
        sentences: mergeArray(state.sentences, action.sentences),
        errorMessage: '',
      });

    case ACTION_PARSE_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.error.message,
      });

    default:
      return state;
  }
}
