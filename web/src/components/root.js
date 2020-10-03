import React from 'react';
import { createHashHistory } from 'history';

import '../../css/root.css';
import Store from './store';
import App from './app';

const history = createHashHistory();

export default function Root() {
  return (
    <Store history={history}>
      <App history={history} />
    </Store>
  );
}
