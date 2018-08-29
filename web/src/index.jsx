import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';

async function main() {
  const root = document.getElementById('root');
  ReactDOM.render(<Root></Root>, root);
}

main().catch(console.error.bind(console, 'Initial Render ERROR'));
