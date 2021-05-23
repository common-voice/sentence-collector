import type { AnyAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { sendRequest } from '../backend';
import type {
  BackendSentenceFailure,
  SentenceSubmission,
  SentenceWithSource,
  RejectedSentences,
  RootState,
} from '../types';
import { addLanguage } from './languages';

export const ACTION_SUBMIT_SENTENCES_REQUEST = 'SUBMIT_SENTENCES_REQUEST';
export const ACTION_SUBMIT_SENTENCES_DONE = 'SUBMIT_SENTENCES_DONE';
export const ACTION_SUBMIT_SENTENCES_ERRORS = 'SUBMIT_SENTENCES_ERRORS';
export const ACTION_LOAD_REJECTED_SENTENCES = 'LOAD_REJECTED_SENTENCES';
export const ACTION_GOT_REJECTED_SENTENCES = 'GOT_REJECTED_SENTENCES';
export const ACTION_REJECTED_SENTENCES_FAILURE = 'REJECTED_SENTENCES_FAILURE';
export const ACTION_LOAD_SENTENCES = 'LOAD_SENTENCES';
export const ACTION_GOT_SENTENCES = 'GOT_SENTENCES';
export const ACTION_REVIEWED_SENTENCES = 'REVIEWED_SENTENCES';
export const ACTION_REVIEW_SENTENCES_FAILURE = 'REVIEW_SENTENCES_FAILURE';
export const ACTION_REVIEW_RESET_MESSAGE = 'REVIEW_RESET_MESSAGE';

type SentencePutResponse = {
  errors: BackendSentenceFailure[]
  duplicates: number
}

type ReviewedSentences = {
  invalidated: number[]
  validated: number[]
}

type VotesResponse = {
  votes: number
  failedVotes: number
}

export function loadRejectedSentences(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function(dispatch){
    dispatch(loadRejectedSentencesStart());
    try {
      const results = await sendRequest<RejectedSentences>('sentences/rejected');
      dispatch(loadRejectedSentencesDone(results));
    } catch (error) {
      dispatch(loadRejectedSentencesFailure(error.message));
    }
  };
}

export function resetReviewMessage(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function(dispatch) {
    dispatch(resetMessage());
  };
}

export function loadSentences(language: string): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function(dispatch) {
    dispatch(loadSentencesStart());
    try {
      const results = await sendRequest<SentenceWithSource[]>(`sentences/review?locale=${language}`);
      dispatch(loadSentencesDone(results));
    } catch (error) {
      console.error(error);
    }
  };
}

export function uploadSentences(sentencesParams: SentenceSubmission): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function(dispatch, getState): Promise<SentencePutResponse> {
    dispatch(sendSubmitSentences());
    const state = getState();

    try {
      const results = await sendRequest<SentencePutResponse>('sentences', 'PUT', sentencesParams);
      dispatch(submitSentencesDone());

      if (!results || !results.errors) {
        return { errors: [], duplicates: 0 };
      }

      const errorsWithSentenceInfo = results.errors.filter((error) => error.sentence);
      dispatch(submitSentencesErrors(errorsWithSentenceInfo));

      if(!state.languages.languages.includes(sentencesParams.locale)) {
        // TODO: set up Redux types so that thunk middleware typing works...
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(addLanguage(sentencesParams.locale));
      }

      return results;
    } catch (error) {
      dispatch(submitSentencesDone());
      throw error;
    }
  };
}

export function reviewSentences(data: ReviewedSentences, language: string): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function(dispatch) {
    try {
      const { votes } = await sendRequest<VotesResponse>('votes', 'PUT', data);
      dispatch(reviewSentencesDone(votes));
      // TODO: set up Redux types so that thunk middleware typing works...
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(loadSentences(language));
    } catch (error) {
      dispatch(reviewSentencesFailure(error.message));
    }
  };
}

function sendSubmitSentences() {
  return {
    type: ACTION_SUBMIT_SENTENCES_REQUEST,
  };
}

function submitSentencesDone() {
  return {
    type: ACTION_SUBMIT_SENTENCES_DONE,
  };
}

function submitSentencesErrors(errors: BackendSentenceFailure[]) {
  return {
    type: ACTION_SUBMIT_SENTENCES_ERRORS,
    errors,
  };
}

function loadRejectedSentencesStart() {
  return {
    type: ACTION_LOAD_REJECTED_SENTENCES,
  };
}

function loadRejectedSentencesDone(sentences: RejectedSentences) {
  return {
    type: ACTION_GOT_REJECTED_SENTENCES,
    sentences,
  };
}

function loadRejectedSentencesFailure(errorMessage: string) {
  return {
    type: ACTION_REJECTED_SENTENCES_FAILURE,
    errorMessage,
  };
}

function loadSentencesStart() {
  return {
    type: ACTION_LOAD_SENTENCES,
  };
}

function loadSentencesDone(sentences: SentenceWithSource[]) {
  return {
    type: ACTION_GOT_SENTENCES,
    sentences,
  };
}

function reviewSentencesDone(votes: number) {
  return {
    type: ACTION_REVIEWED_SENTENCES,
    votes,
  };
}

function reviewSentencesFailure(errorMessage: string) {
  return {
    type: ACTION_REVIEW_SENTENCES_FAILURE,
    errorMessage,
  };
}

function resetMessage() {
  return {
    type: ACTION_REVIEW_RESET_MESSAGE,
  };
}
