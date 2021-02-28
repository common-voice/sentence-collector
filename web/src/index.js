import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line no-unused-vars

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/root';

async function main() {
  const root = document.getElementById('root');
  ReactDOM.render(<Root></Root>, root);
}

main().catch(console.error.bind(console, 'Initial Render ERROR'));
