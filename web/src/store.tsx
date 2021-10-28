import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import type { History } from 'history';

import createRootReducer from './reducers';
// !!! FIXME ??? Is this necessary?
// Uncaught Error: useLocalization was used without wrapping it in a <LocalizationProvider />.
// import { useLocalization, LocalizationProvider } from '@fluent/react';

const ROOT_KEY = 'redux';
const persistConfig = {
  key: ROOT_KEY,
  storage,
};

function getStore(history: History) {
  const rootReducer = createRootReducer(history);
  const persistedRecuder = persistReducer(persistConfig, rootReducer);

  return createStore(
    persistedRecuder,
    {},
    compose(applyMiddleware(thunk), applyMiddleware(routerMiddleware(history)))
  );
}

type Props = {
  history: History;
  children: React.ReactNode;
};

export default function Store(props: Props) {
  const history = props.history;
  const store = getStore(history);
  const persistor = persistStore(store);
  // !!! FIXME ??? Is this necessary?
  // const { l10n } = useLocalization();

  return (
    <Provider store={store}>
      {/* !!! FIXME ??? Is this necessary? */}
      {/* <PersistGate loading={<p>{l10n.getString('sc-store-loading')}</p>} persistor={persistor}> */}
      <PersistGate loading={<p>Loading…</p>} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}
