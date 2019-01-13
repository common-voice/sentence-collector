import WebDB from '../web-db';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN_REQUEST = 'LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'LOGIN_FAILURE';
export const ACTION_LOGIN_CHECK_USERNAME_FAILED = 'ACTION_LOGIN_CHECK_USERNAME_FAILED';
export const ACTION_LOGIN_CHECK_USERNAME_SUCCESS = 'ACTION_LOGIN_CHECK_USERNAME_SUCCESS';

export const ACTION_ADD_LANGUAGE_REQUEST = 'ADD_LANGUAGE_REQUEST';
export const ACTION_ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS';
export const ACTION_ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE';

export const ACTION_REMOVE_LANGUAGE_REQUEST = 'REMOVE_LANGUAGE_REQUEST';
export const ACTION_REMOVE_LANGUAGE_SUCCESS = 'REMOVE_LANGUAGE_SUCCESS';
export const ACTION_REMOVE_LANGUAGE_FAILURE = 'REMOVE_LANGUAGE_FAILURE';

export const ACTION_SUBMIT_SENTENCES_REQUEST = 'SUBMIT_SENTENCES_REQUEST';
export const ACTION_SUBMIT_SENTENCES_SUCCESS = 'SUBMIT_SENTENCES_SUCCESS';
export const ACTION_SUBMIT_SENTENCES_FAILURE = 'SUBMIT_SENTENCES_FAILURE';
export const ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE = 'SUBMIT_SENTENCES_FAILURE_SINGLE';

export const ACTION_RESET_STATE = 'ACTION_RESET_STATE';

const VALID_USERNAME_CHARACTERS = /^[a-zA-Z0-9]+$/;

export function login(username, password) {
  return async function(dispatch) {
    try {
      dispatch(sendLoginRequest());

      const db = new WebDB(username, password);
      const user = await db.auth();
      dispatch(loginSuccess(username, password, user.languages));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
}

export function checkUsername(username) {
  return async function(dispatch) {
    const isAllowed = VALID_USERNAME_CHARACTERS.test(username);

    const action = isAllowed ? usernameSuccess() : usernameFailure();
    return dispatch(action);
  };
}

export function addLanguage(language) {
  return async function(dispatch, getState) {
    try {
      dispatch(sendAddLanguage());

      const state = getState();
      const db = new WebDB(state.username, state.password);
      const updatedLanguages = await db.addLanguage(language);
      dispatch(addLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(addLanguageFailure());
      throw err;
    }
  };
}

export function removeLanguage(language) {
  return async function(dispatch, getState) {
    try {
      dispatch(sendRemoveLanguage());

      const state = getState();
      const db = new WebDB(state.username, state.password);
      const updatedLanguages = await db.removeLanguage(language);
      dispatch(removeLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(removeLanguageFailure());
      throw err;
    }
  };
}

export function submitSentences(language, sentences, source) {
  return async function(dispatch, getState) {
    try {
      dispatch(sendSubmitSentences());

      const state = getState();
      const db = new WebDB(state.username, state.password);
      const results = await db.submitSentences(language, sentences, source);
      dispatch(submitSentencesSuccess(results.sentences.slice(0)));
      const errorsWithSentenceInfo = results.errors.filter((error) => error.sentence);
      dispatch(submitSentencesFailureSingle(errorsWithSentenceInfo));
      return results;
    } catch (err) {
      dispatch(submitSentencesFailure());
      throw err;
    }
  };
}

export function usernameSuccess() {
  return {
    type: ACTION_LOGIN_CHECK_USERNAME_SUCCESS,
  };
}

export function usernameFailure() {
  return {
    type: ACTION_LOGIN_CHECK_USERNAME_FAILED,
  };
}

export function logout() {
  return {
    type: ACTION_LOGOUT,
  };
}

export function sendLoginRequest() {
  return {
    type: ACTION_LOGIN_REQUEST,
  };
}

export function loginSuccess(username, password, languages) {
  return {
    type: ACTION_LOGIN_SUCCESS,
    username,
    password,
    languages,
  };
}

export function loginFailure() {
  return {
    type: ACTION_LOGIN_FAILURE,
  };
}

export function sendAddLanguage() {
  return {
    type: ACTION_ADD_LANGUAGE_REQUEST,
  };
}

export function addLanguageSuccess(languages) {
  return {
    type: ACTION_ADD_LANGUAGE_SUCCESS,
    languages,
  };
}

export function addLanguageFailure() {
  return {
    type: ACTION_ADD_LANGUAGE_FAILURE,
  };
}

export function sendRemoveLanguage() {
  return {
    type: ACTION_REMOVE_LANGUAGE_REQUEST,
  };
}

export function removeLanguageSuccess(languages) {
  return {
    type: ACTION_REMOVE_LANGUAGE_SUCCESS,
    languages,
  };
}

export function removeLanguageFailure() {
  return {
    type: ACTION_REMOVE_LANGUAGE_FAILURE,
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

export function submitSentencesFailure() {
  return {
    type: ACTION_SUBMIT_SENTENCES_FAILURE,
  };
}

export function submitSentencesFailureSingle(errors) {
  return {
    type: ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE,
    errors,
  };
}

export function resetFullState() {
  return {
    type: ACTION_RESET_STATE,
  };
}

