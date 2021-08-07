import regeneratorRuntime from 'regenerator-runtime'; // eslint-disable-line @typescript-eslint/no-unused-vars

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';

async function main() {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
}

main().catch(console.error.bind(console, 'Initial Render ERROR'));
