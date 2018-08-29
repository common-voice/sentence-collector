import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer, { INITIAL_STATE } from '../reducers';

const ROOT_KEY = 'redux';

function getConnectedReducer(reducer, history) {
  return connectRouter(history)(reducer);
}

function getPersistedReducer(reducer) {
  const persistConfig = {
    key: ROOT_KEY,
    storage,
  };

  return persistReducer(persistConfig, reducer);
}

function getPersistedStore(reducer, history) {
  return createStore(
    reducer,
    INITIAL_STATE,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history))
    )
  );
}

function getPersistor(store) {
  return persistStore(store);
}

export default function Store(props) {
  const history = props.history;
  const persistedReducer = getPersistedReducer(rootReducer);
  const connectedReducer = getConnectedReducer(persistedReducer, history);
  const store = getPersistedStore(connectedReducer, history);
  const persistor = getPersistor(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}
