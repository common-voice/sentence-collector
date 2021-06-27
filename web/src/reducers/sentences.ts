import type { AnyAction } from 'redux';

import {
  ACTION_SUBMIT_SENTENCES_REQUEST,
  ACTION_SUBMIT_SENTENCES_DONE,
  ACTION_SUBMIT_SENTENCES_ERRORS,
  ACTION_LOAD_REJECTED_SENTENCES,
  ACTION_GOT_REJECTED_SENTENCES,
  ACTION_REJECTED_SENTENCES_FAILURE,
  ACTION_LOAD_MY_SENTENCES,
  ACTION_GOT_MY_SENTENCES,
  ACTION_MY_SENTENCES_FAILURE,
  ACTION_DELETE_SENTENCES,
  ACTION_DELETE_SENTENCES_DONE,
  ACTION_DELETE_SENTENCES_FAILURE,
  ACTION_LOAD_SENTENCES,
  ACTION_GOT_SENTENCES,
  ACTION_REVIEWED_SENTENCES,
  ACTION_REVIEW_SENTENCES_FAILURE,
  ACTION_REVIEW_RESET_MESSAGE,
  ACTION_REVIEW_SAVE_SKIPPED_SENTENCES,
  ACTION_REVIEW_RESET_SKIPPED_SENTENCES,
} from '../actions/sentences';

import type {
  BackendSentenceFailure,
  RejectedSentences,
  MySentences,
  SentenceRecord,
  SubmissionFailures,
} from '../types';

export type SentencesState = {
  sentenceSubmissionFailures: SubmissionFailures
  isUploadingSentences: boolean
  rejectedSentencesLoading: boolean
  rejectedSentences: RejectedSentences
  rejectedSentencesError: string
  mySentencesLoading: boolean
  mySentences: MySentences
  mySentencesError: string
  deleteSentencesLoading: boolean
  deleteSentencesError: string
  sentences: SentenceRecord[]
  sentencesLoading: boolean
  reviewMessage: string
  skippedSentences: number[]
}

export const INITIAL_STATE: SentencesState = {
  sentenceSubmissionFailures: {},
  isUploadingSentences: false,
  rejectedSentencesLoading: false,
  rejectedSentences: {},
  rejectedSentencesError: '',
  mySentencesLoading: false,
  mySentences: {},
  mySentencesError: '',
  deleteSentencesLoading: false,
  deleteSentencesError: '',
  sentences: [],
  sentencesLoading: false,
  reviewMessage: '',
  skippedSentences: [],
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

    case ACTION_LOAD_MY_SENTENCES:
      return Object.assign({}, state, {
        mySentencesLoading: true,
        mySentencesError: null,
      });

    case ACTION_GOT_MY_SENTENCES:
      return Object.assign({}, state, {
        mySentencesLoading: false,
        mySentences: action.sentences,
      });

    case ACTION_MY_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        mySentencesLoading: false,
        mySentences: {},
        mySentencesError: action.errorMessage,
      });

    case ACTION_DELETE_SENTENCES:
      return Object.assign({}, state, {
        deleteSentencesLoading: true,
        deleteSentencesError: null,
      });

    case ACTION_DELETE_SENTENCES_DONE:
      return Object.assign({}, state, {
        deleteSentencesLoading: false,
      });

    case ACTION_DELETE_SENTENCES_FAILURE:
      return Object.assign({}, state, {
        deleteSentencesLoading: false,
        deleteSentencesError: action.errorMessage,
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

    case ACTION_REVIEW_SAVE_SKIPPED_SENTENCES:
      return Object.assign({}, state, {
        skippedSentences: state.skippedSentences ?
          [...state.skippedSentences, ...action.sentenceIds] :
          [...action.sentenceIds],
      });

    case ACTION_REVIEW_RESET_SKIPPED_SENTENCES:
      return Object.assign({}, state, {
        skippedSentences: [],
      });

    case ACTION_REVIEW_RESET_MESSAGE:
      return Object.assign({}, state, {
        reviewMessage: '',
      });

    default:
      return state;
  }
}
