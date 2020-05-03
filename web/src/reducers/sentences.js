import {
  ACTION_SUBMIT_SENTENCES_REQUEST,
  ACTION_SUBMIT_SENTENCES_SUCCESS,
  ACTION_SUBMIT_SENTENCES_FAILURE,
} from '../actions/sentences';

export const INITIAL_STATE = {
  sentenceSubmissionFailures: [],
  isUploadingSentences: false,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_SUBMIT_SENTENCES_REQUEST:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: [],
        isUploadingSentences: true,
      });

    case ACTION_SUBMIT_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: action.errors || [],
      });

    case ACTION_SUBMIT_SENTENCES_SUCCESS:
      return Object.assign({}, state, {
        isUploadingSentences: false,
      });

    default:
      return state;
  }
}
