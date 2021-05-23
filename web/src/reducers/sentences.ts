import type { AnyAction } from 'redux';

import {
  ACTION_SUBMIT_SENTENCES_REQUEST,
  ACTION_SUBMIT_SENTENCES_DONE,
  ACTION_SUBMIT_SENTENCES_ERRORS,
  ACTION_LOAD_REJECTED_SENTENCES,
  ACTION_GOT_REJECTED_SENTENCES,
  ACTION_REJECTED_SENTENCES_FAILURE,
  ACTION_LOAD_SENTENCES,
  ACTION_GOT_SENTENCES,
  ACTION_REVIEWED_SENTENCES,
  ACTION_REVIEW_SENTENCES_FAILURE,
  ACTION_REVIEW_RESET_MESSAGE,
} from '../actions/sentences';

import type {
  BackendSentenceFailure,
  RejectedSentences,
  SentenceWithSource,
  SubmissionFailures,
} from '../types';

export type SentencesState = {
  sentenceSubmissionFailures: SubmissionFailures
  isUploadingSentences: boolean
  rejectedSentencesLoading: boolean
  rejectedSentences: RejectedSentences
  rejectedSentencesError: string
  sentences: SentenceWithSource[]
  sentencesLoading: boolean
  reviewMessage: string
}

export const INITIAL_STATE: SentencesState = {
  sentenceSubmissionFailures: {},
  isUploadingSentences: false,
  rejectedSentencesLoading: false,
  rejectedSentences: {},
  rejectedSentencesError: '',
  sentences: [],
  sentencesLoading: false,
  reviewMessage: '',
};

export default function(state = INITIAL_STATE, action: AnyAction): SentencesState {
  const errors = action.errors || [];

  switch(action.type) {
    case ACTION_SUBMIT_SENTENCES_REQUEST:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: {},
        isUploadingSentences: true,
      });

    case ACTION_SUBMIT_SENTENCES_ERRORS:
      return Object.assign({}, state, {
        sentenceSubmissionFailures: errors.reduce((groupedFiltered: SubmissionFailures, filterResult: BackendSentenceFailure) => {
          if (!groupedFiltered[filterResult.error]) {
            groupedFiltered[filterResult.error] = [];
          }

          groupedFiltered[filterResult.error].push(filterResult.sentence);
          return groupedFiltered;
        }, {}),
      });

    case ACTION_SUBMIT_SENTENCES_DONE:
      return Object.assign({}, state, {
        isUploadingSentences: false,
      });

    case ACTION_LOAD_REJECTED_SENTENCES:
      return Object.assign({}, state, {
        rejectedSentencesLoading: true,
        rejectedSentencesError: null,
      });

    case ACTION_GOT_REJECTED_SENTENCES:
      return Object.assign({}, state, {
        rejectedSentencesLoading: false,
        rejectedSentences: action.sentences,
      });

    case ACTION_REJECTED_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        rejectedSentencesLoading: false,
        rejectedSentences: {},
        rejectedSentencesError: action.errorMessage,
      });

    case ACTION_LOAD_SENTENCES:
      return Object.assign({}, state, {
        sentencesLoading: true,
      });

    case ACTION_GOT_SENTENCES:
      return Object.assign({}, state, {
        sentencesLoading: false,
        sentences: action.sentences,
      });

    case ACTION_REVIEWED_SENTENCES:
      return Object.assign({}, state, {
        reviewMessage: `${action.votes} sentences reviewed. Thank you!`,
      });

    case ACTION_REVIEW_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        reviewMessage: action.errorMessage,
      });

    case ACTION_REVIEW_RESET_MESSAGE:
      return Object.assign({}, state, {
        reviewMessage: '',
      });

    default:
      return state;
  }
}
