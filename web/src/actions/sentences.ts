import { addLanguage } from './languages';
import { sendRequest } from '../backend';

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

export function loadRejectedSentences() {
  return async function(dispatch) {
    dispatch(loadRejectedSentencesStart());
    try {
      const results = await sendRequest('sentences/rejected');
      dispatch(loadRejectedSentencesDone(results));
    } catch (error) {
      dispatch(loadRejectedSentencesFailure(error.message));
    }
  };
}

export function resetReviewMessage() {
  return async function(dispatch) {
    dispatch(resetMessage());
  };
}

export function loadSentences(language: string) {
  return async function(dispatch) {
    dispatch(loadSentencesStart());
    try {
      const results = await sendRequest(`sentences/review?locale=${language}`);
      dispatch(loadSentencesDone(results));
    } catch (error) {
      console.error(error);
    }
  };
}

export function uploadSentences(sentencesParams) {
  return async function(dispatch, getState): Promise<{ errors?: number, duplicates?: number}> {
    dispatch(sendSubmitSentences());
    const state = getState();

    try {
      const results = await sendRequest('sentences', 'PUT', sentencesParams);
      dispatch(submitSentencesDone());

      if (!results || !results.errors) {
        return {};
      }

      const errorsWithSentenceInfo = results.errors.filter((error) => error.sentence);
      dispatch(submitSentencesErrors(errorsWithSentenceInfo));

      if(!state.languages.languages.includes(sentencesParams.locale)) {
        dispatch(addLanguage(sentencesParams.locale));
      }

      return results;
    } catch (error) {
      dispatch(submitSentencesDone());
      throw error;
    }
  };
}

export function reviewSentences(data, language: string) {
  return async function(dispatch) {
    try {
      const { votes } = await sendRequest('votes', 'PUT', data);
      dispatch(reviewSentencesDone(votes));
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

function submitSentencesErrors(errors) {
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

function loadRejectedSentencesDone(sentences) {
  return {
    type: ACTION_GOT_REJECTED_SENTENCES,
    sentences,
  };
}

function loadRejectedSentencesFailure(errorMessage) {
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

function loadSentencesDone(sentences) {
  return {
    type: ACTION_GOT_SENTENCES,
    sentences,
  };
}

function reviewSentencesDone(votes) {
  return {
    type: ACTION_REVIEWED_SENTENCES,
    votes,
  };
}

function reviewSentencesFailure(errorMessage) {
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
