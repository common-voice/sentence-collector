import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/app';
import Store from './store';

async function main() {
  const store = createStore(Store);
  const root = document.getElementById('root');
  ReactDOM.render(<Provider store={store}><App /></Provider>, root);
}

main().catch(console.error.bind(console, 'Render ERROR'));
