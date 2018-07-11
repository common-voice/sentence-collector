import React from "react";
import ReactDOM  from "react-dom";

import './index.css';
import App from './components/app';

async function main() {
  ReactDOM.render(<App />, document.getElementById('content'));
}

main().catch(console.error.bind(console, 'Render ERROR'));
