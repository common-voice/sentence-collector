import React from "react";
import ReactDOM  from "react-dom";

import DB from '../shared/ts/db';
import App from './components/app';

const USERNAME = 'admin';
const PASSWORD = 'password';

async function main() {
  //const kinto = new DB(USERNAME, PASSWORD);
  //await kinto.init();
  //const id = await kinto.getId();
  ReactDOM.render(<App />, document.getElementById('content'));
}

main().catch(console.error.bind(console));
