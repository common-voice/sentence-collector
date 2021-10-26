import React from 'react';
import { createHashHistory } from 'history';

import '../css/root.css';
import App from './app';
import Store from './store';

const history = createHashHistory();

export default function Root() {
  return (
    <Store history={history}>
      <App history={history} />
    </Store>
  );
}
