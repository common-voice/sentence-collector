import { addLanguage } from './languages';
import { sendRequest } from '../backend';

export const ACTION_SUBMIT_SENTENCES_REQUEST = 'SUBMIT_SENTENCES_REQUEST';
export const ACTION_SUBMIT_SENTENCES_SUCCESS = 'SUBMIT_SENTENCES_SUCCESS';
export const ACTION_SUBMIT_SENTENCES_FAILURE = 'SUBMIT_SENTENCES_FAILURE';

export function uploadSentences({ locale, sentences, source, user }) {
  return async function(dispatch, getState) {
    dispatch(sendSubmitSentences());
    const state = getState();

    const data = {
      source,
      locale,
      sentences,
      user,
    };
    const results = await sendRequest('sentences', 'PUT', data);
    dispatch(submitSentencesSuccess());

    if (!results || !results.errors) {
      return {};
    }

    const errorsWithSentenceInfo = results.errors.filter((error) => error.sentence);
    dispatch(submitSentencesFailure(errorsWithSentenceInfo));

    if(!state.languages.languages.includes(locale)) {
      dispatch(addLanguage(locale));
    }

    return results;
  };
}

export function sendSubmitSentences() {
  return {
    type: ACTION_SUBMIT_SENTENCES_REQUEST,
  };
}

export function submitSentencesSuccess() {
  return {
    type: ACTION_SUBMIT_SENTENCES_SUCCESS,
  };
}

export function submitSentencesFailure(errors) {
  return {
    type: ACTION_SUBMIT_SENTENCES_FAILURE,
    errors,
  };
}
