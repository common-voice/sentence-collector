import React from 'react';
import ReactDOM from 'react-dom';

import '../css/index.css';
import Store from './store';
import App from './components/app';

async function main() {
  const root = document.getElementById('root');
  ReactDOM.render(<Store><App /></Store>, root);
}

main().catch(console.error.bind(console, 'Initial Render ERROR'));
