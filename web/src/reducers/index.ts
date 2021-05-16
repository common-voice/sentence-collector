import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import languages from './languages';
import login from './login';
import sentences from './sentences';
import settings from './settings';

export default function(history) {
  return combineReducers({
    router: connectRouter(history),
    languages,
    login,
    sentences,
    settings,
  });
}
