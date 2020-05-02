import {
  ACTION_ADD_LANGUAGE_REQUEST,
  ACTION_ADD_LANGUAGE_SUCCESS,
  ACTION_ADD_LANGUAGE_FAILURE,
  ACTION_REMOVE_LANGUAGE_REQUEST,
  ACTION_REMOVE_LANGUAGE_SUCCESS,
  ACTION_REMOVE_LANGUAGE_FAILURE,
  ACTION_GOT_LANGUAGES,
} from '../actions/languages';

export const INITIAL_STATE = {
  languages: [],
  allLanguages: [],
  pendingLanguages: false,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ACTION_GOT_LANGUAGES:
      return Object.assign({}, state, {
        allLanguages: action.languages,
      });

    case ACTION_ADD_LANGUAGE_REQUEST:
      return Object.assign({}, state, {
        pendingLanguages: true,
      });

    case ACTION_ADD_LANGUAGE_SUCCESS:
      return Object.assign({}, state, {
        pendingLanguages: false,
        languages: action.languages,
      });

    case ACTION_ADD_LANGUAGE_FAILURE:
      return Object.assign({}, state, {
        pendingLanguages: false,
      });

    case ACTION_REMOVE_LANGUAGE_REQUEST:
      return Object.assign({}, state, {
        pendingLanguages: true,
      });

    case ACTION_REMOVE_LANGUAGE_SUCCESS:
      return Object.assign({}, state, {
        pendingLanguages: false,
        languages: action.languages,
      });

    case ACTION_REMOVE_LANGUAGE_FAILURE:
      return Object.assign({}, state, {
        pendingLanguages: false,
      });

    default:
      return state;
  }
}
