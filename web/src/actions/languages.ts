import { sendRequest } from '../backend';

export const ACTION_ADD_LANGUAGE_REQUEST = 'ADD_LANGUAGE_REQUEST';
export const ACTION_ADD_LANGUAGE_SUCCESS = 'ADD_LANGUAGE_SUCCESS';
export const ACTION_ADD_LANGUAGE_FAILURE = 'ADD_LANGUAGE_FAILURE';

export const ACTION_REMOVE_LANGUAGE_REQUEST = 'REMOVE_LANGUAGE_REQUEST';
export const ACTION_REMOVE_LANGUAGE_SUCCESS = 'REMOVE_LANGUAGE_SUCCESS';
export const ACTION_REMOVE_LANGUAGE_FAILURE = 'REMOVE_LANGUAGE_FAILURE';

export const ACTION_GOT_LANGUAGES = 'ACTION_GOT_LANGUAGES';
export const ACTION_GET_STATS = 'ACTION_GET_STATS';
export const ACTION_GOT_STATS = 'ACTION_GOT_STATS';
export const ACTION_RESET_STATS_STATUS = 'ACTION_RESET_STATS_STATUS';

const UPDATE_FREQUENCY_MS = 6 * 60 * 60 * 1000;

export function getStats(locales = [], lastUpdate) {
  return async function(dispatch) {
    if (Date.now() - lastUpdate < UPDATE_FREQUENCY_MS) {
      dispatch(resetStatsStatus());
      return;
    }

    dispatch(gettingStats());
    const joinedLocales = locales.join(',');
    try {
      const stats = await sendRequest(`stats?locales=${joinedLocales}`);
      dispatch(gotStats(stats));
    } catch (error) {
      console.error('Failed to fetch stats', error);
      dispatch(resetStatsStatus());
    }
  };
}

export function getLanguages() {
  return async function(dispatch) {
    try {
      const languages = await sendRequest('languages');
      dispatch(gotLanguages(languages));
    } catch (error) {
      console.error('Failed to fetch languages', error);
    }
  };
}

export function addLanguage(language) {
  return async function(dispatch) {
    try {
      dispatch(sendAddLanguage());
      const updatedLanguages = await sendRequest('users/languages', 'PUT', { language });
      dispatch(addLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(addLanguageFailure());
      throw err;
    }
  };
}

export function removeLanguage(language) {
  return async function(dispatch) {
    try {
      dispatch(sendRemoveLanguage());
      const updatedLanguages = await sendRequest(`users/languages/${language}`, 'DELETE');
      dispatch(removeLanguageSuccess(updatedLanguages));
    } catch (err) {
      dispatch(removeLanguageFailure());
      throw err;
    }
  };
}

export function gettingStats() {
  return {
    type: ACTION_GET_STATS,
  };
}

export function gotStats(stats) {
  return {
    type: ACTION_GOT_STATS,
    stats,
  };
}

export function resetStatsStatus() {
  return {
    type: ACTION_RESET_STATS_STATUS,
  };
}

export function gotLanguages(languages) {
  return {
    type: ACTION_GOT_LANGUAGES,
    languages,
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
