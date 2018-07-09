import React from "react";
import ReactDOM  from "react-dom";

import App from './components/app';
import './index.css';

const USERNAME = 'admin';
const PASSWORD = 'password';

async function main() {
  ReactDOM.render(<App />, document.getElementById('content'));
}

main().catch(console.error.bind(console));
