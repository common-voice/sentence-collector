import React from 'react';
import { createHashHistory } from 'history';

import '../../css/root.css';
import Store from './store';
import App from '../containers/app';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.history = createHashHistory();
  }

  componentDidCatch(error, info) {
    console.error('Root component error', error, info);
  }

  render() {
    return (
      <Store history={this.history}>
        <App history={this.history} />
      </Store>
    );
  }
}
