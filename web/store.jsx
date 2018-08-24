import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage';

import {
  ACTION_PENDING,
  ACTION_LOGOUT, ACTION_LOGIN,
  LOGIN_STATUSES
} from './store/actions';

const ROOT_KEY = 'root';
const initialState = {
  auth: LOGIN_STATUSES.LOGGED_OUT,
  username: null,
};

function copyInto(oldObj, newObj) {
  return Object.assign({}, oldObj, newObj);
}

export function reducer(state, action) {
  if (!state) {
    state = initialState;
  }

  switch(action.type) {
    case ACTION_LOGOUT:
      return initialState;

    case ACTION_LOGIN:
      return  {
        auth: LOGIN_STATUSES.LOGGED_IN,
        username: action.username,
      };

    case ACTION_PENDING:
      return copyInto(state, {
        auth: LOGIN_STATUSES.PENDING,
      });

    default:
      return state;
  }
}

export function getPersistedStore() {
  const persistConfig = {
    key: ROOT_KEY,
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, reducer);
  return createStore(persistedReducer);
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
