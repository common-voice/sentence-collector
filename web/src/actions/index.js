import WebDB from '../web-db';

export const ACTION_LOGOUT = 'LOGOUT';
export const ACTION_LOGIN_REQUEST = 'LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'LOGIN_FAILURE';
export const ACTION_LOGIN_ENABLE = 'ACTION_LOGIN_ENABLE';
export const ACTION_LOGIN_DISABLE = 'ACTION_LOGIN_DISABLE';
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
export const ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE = 'SUBMIT_SENTENCES_FAILURE_SINGLE';

export const ACTION_SETTINGS_CHANGED = 'ACTION_SETTINGS_CHANGED';
export const ACTION_SETTINGS_CHANGED_FAILURE = 'ACTION_SETTINGS_CHANGED_FAILURE';

const VALID_USERNAME_CHARACTERS = /^[a-zA-Z0-9]+$/;

export function login(username, password) {
  return async function(dispatch) {
    try {
      dispatch(sendLoginRequest());

      const db = new WebDB(username, password);
      const user = await db.auth();
      dispatch(loginSuccess(username, password, user.languages, user.settings));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
}

export function checkLoginInput(username, password) {
  return async function(dispatch) {
    const validUsername = checkUsername(username);
    const validPassword = checkPassword(password);

    const usernameAction = validUsername ? usernameSuccess() : usernameFailure();
    dispatch(usernameAction);

    if (!validUsername || !validPassword) {
      return dispatch(disableLogin());
    }

    return dispatch(enableLogin());
  };
}

function checkUsername(username) {
  return VALID_USERNAME_CHARACTERS.test(username);
}

function checkPassword(password) {
  return password !== '';
}

export function setSetting(key, value) {
  return async function(dispatch, getState) {
    try {
      const state = getState();
      const db = new WebDB(state.app.username, state.app.password);
      await db.setSetting(key, value);
      dispatch(settingsChanged({
        [key]: value,
      }));
    } catch (err) {
      dispatch(settingsChangedFailure());
      throw err;
    }
  };
}

export function addLanguage(language) {
  return async function(dispatch, getState) {
    try {
      dispatch(sendAddLanguage());

      const state = getState();
      const db = new WebDB(state.app.username, state.app.password);
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
      const db = new WebDB(state.app.username, state.app.password);
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
    dispatch(sendSubmitSentences());

    const state = getState();
    const db = new WebDB(state.app.username, state.app.password);
    const results = await db.submitSentences(language, sentences, source);
    dispatch(submitSentencesSuccess(results.sentences.slice(0)));
    const errorsWithSentenceInfo = results.errors.filter((error) => error.sentence);
    dispatch(submitSentencesFailureSingle(errorsWithSentenceInfo));
    if(!state.app.languages.includes(language)) {
      dispatch(addLanguage(language));
    }
    return results;
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

export function disableLogin() {
  return {
    type: ACTION_LOGIN_DISABLE,
  };
}

export function enableLogin() {
  return {
    type: ACTION_LOGIN_ENABLE,
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

export function loginSuccess(username, password, languages, settings) {
  return {
    type: ACTION_LOGIN_SUCCESS,
    username,
    password,
    languages,
    settings,
  };
}

export function loginFailure() {
  return {
    type: ACTION_LOGIN_FAILURE,
  };
}

export function settingsChanged(newSettings) {
  return {
    type: ACTION_SETTINGS_CHANGED,
    newSettings,
  };
}

export function settingsChangedFailure() {
  return {
    type: ACTION_SETTINGS_CHANGED_FAILURE,
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

export function submitSentencesFailureSingle(errors) {
  return {
    type: ACTION_SUBMIT_SENTENCES_FAILURE_SINGLE,
    errors,
  };
}
