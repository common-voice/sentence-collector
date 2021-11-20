import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';

import languages from './languages';
import login from './login';
import sentences from './sentences';
import settings from './settings';

const languagesPersistConfig = {
  key: 'languages',
  storage,
  blacklist: ['allLanguages', 'languages'],
};

const sentencesPersistConfig = {
  key: 'sentences',
  storage,
  blacklist: ['sentences'],
};

export default function (history: History) {
  return combineReducers({
    router: connectRouter(history),
    languages: persistReducer(languagesPersistConfig, languages),
    login,
    sentences: persistReducer(sentencesPersistConfig, sentences),
    settings,
  });
}
