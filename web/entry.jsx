import React from "react";
import ReactDOM  from "react-dom";

import App from './components/app';
import DB from '../shared/js/db';

const USERNAME = 'admin';
const PASSWORD = 'password';

async function main() {
  const kinto = new DB(USERNAME, PASSWORD);
  await kinto.init();
  const id = await kinto.getId();
  ReactDOM.render(<App id={id} />, document.getElementById('content'));
}

main().catch(console.error.bind(console));
