import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import reducer, { INITIAL_STATE } from './reducers';

const ROOT_KEY = 'redux';

export function getPersistedStore() {
  const persistConfig = {
    key: ROOT_KEY,
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, reducer);
  return createStore(persistedReducer, INITIAL_STATE, applyMiddleware(thunk));
}

export function getPersistor(store) {
  return persistStore(store);
}

export default function Store(props) {
  const store = getPersistedStore();
  const persistor = getPersistor(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}
