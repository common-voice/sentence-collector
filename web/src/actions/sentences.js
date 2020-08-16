import { addLanguage } from './languages';
import { sendRequest } from '../backend';

export const ACTION_SUBMIT_SENTENCES_REQUEST = 'SUBMIT_SENTENCES_REQUEST';
export const ACTION_SUBMIT_SENTENCES_DONE = 'ACTION_SUBMIT_SENTENCES_DONE';
export const ACTION_SUBMIT_SENTENCES_FAILURE = 'SUBMIT_SENTENCES_FAILURE';

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

export function sendSubmitSentences() {
  return {
    type: ACTION_SUBMIT_SENTENCES_REQUEST,
  };
}

export function submitSentencesDone() {
  return {
    type: ACTION_SUBMIT_SENTENCES_DONE,
  };
}

export function submitSentencesFailure(errors) {
  return {
    type: ACTION_SUBMIT_SENTENCES_FAILURE,
    errors,
  };
}
