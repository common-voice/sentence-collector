import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getNewStore } from './store/store';

import './index.css';
import App from './components/app';

async function main() {
  const store = getNewStore();
  const root = document.getElementById('root');
  ReactDOM.render(<Provider store={store}><App /></Provider>, root);
}

main().catch(console.error.bind(console, 'Render ERROR'));
