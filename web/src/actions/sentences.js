import { addLanguage } from './languages';
import { sendRequest } from '../backend';

export const ACTION_SUBMIT_SENTENCES_REQUEST = 'SUBMIT_SENTENCES_REQUEST';
export const ACTION_SUBMIT_SENTENCES_DONE = 'SUBMIT_SENTENCES_DONE';
export const ACTION_SUBMIT_SENTENCES_FAILURE = 'SUBMIT_SENTENCES_FAILURE';
export const ACTION_LOAD_REJECTED_SENTENCES = 'LOAD_REJECTED_SENTENCES';
export const ACTION_GOT_REJECTED_SENTENCES = 'GOT_REJECTED_SENTENCES';
export const ACTION_REJECTED_SENTENCES_FAILURE = 'REJECTED_SENTENCES_FAILURE';
export const ACTION_LOAD_SENTENCES = 'LOAD_SENTENCES';
export const ACTION_GOT_SENTENCES = 'GOT_SENTENCES';

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

export function loadSentences(language) {
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

export function uploadSentences({ locale, sentences, source }) {
  return async function(dispatch, getState) {
    dispatch(sendSubmitSentences());
    const state = getState();

    const data = {
      source,
      locale,
      sentences,
    };

    try {
      const results = await sendRequest('sentences', 'PUT', data);
      dispatch(submitSentencesDone());

      if (!results || !results.errors) {
        dispatch(submitSentencesDone());
        return {};
      }

      const errorsWithSentenceInfo = results.errors.filter((error) => error.sentence);
      dispatch(submitSentencesFailure(errorsWithSentenceInfo));

      if(!state.languages.languages.includes(locale)) {
        dispatch(addLanguage(locale));
      }

      return results;
    } catch (error) {
      dispatch(submitSentencesDone());
      throw error;
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

function submitSentencesFailure(errors) {
  return {
    type: ACTION_SUBMIT_SENTENCES_FAILURE,
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
