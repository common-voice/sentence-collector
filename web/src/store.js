import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';

const ROOT_KEY = 'redux';
const persistConfig = {
  key: ROOT_KEY,
  storage,
};

function getStore(history) {
  const rootReducer = createRootReducer(history);
  const persistedRecuder = persistReducer(persistConfig, rootReducer);

  return createStore(
    persistedRecuder,
    {},
    compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history))
    )
  );
}

export default function Store(props) {
  const history = props.history;
  const store = getStore(history);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}
