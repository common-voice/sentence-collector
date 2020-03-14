import WebDB from '../web-db';
import languages from './languages';

export const ACTION_SUBMIT_SENTENCES_REQUEST = 'SUBMIT_SENTENCES_REQUEST';
export const ACTION_SUBMIT_SENTENCES_SUCCESS = 'SUBMIT_SENTENCES_SUCCESS';
export const ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE = 'SUBMIT_SENTENCES_FAILURE_SINGLE';

export function submitSentences(language, sentences, source) {
  return async function(dispatch, getState) {
    dispatch(sendSubmitSentences());

    const state = getState();
    const db = new WebDB(state.login.username, state.login.password);
    const results = await db.submitSentences(language, sentences, source);
    dispatch(submitSentencesSuccess(results.sentences.slice(0)));
    const errorsWithSentenceInfo = results.errors.filter((error) => error.sentence);
    dispatch(submitSentencesFailureSingle(errorsWithSentenceInfo));
    if(!state.languages.languages.includes(language)) {
      dispatch(languages.addLanguage(language));
    }
    return results;
  };
}

export function sendSubmitSentences() {
  return {
    type: ACTION_SUBMIT_SENTENCES_REQUEST,
  };
}

export function submitSentencesSuccess(sentences) {
  return {
    type: ACTION_SUBMIT_SENTENCES_SUCCESS,
    sentences,
  };
}

export function submitSentencesFailureSingle(errors) {
  return {
    type: ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE,
    errors,
  };
}
