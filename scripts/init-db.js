const btoa = require('btoa');
const DB = require('./src/db').default;

// Kinto http needs fetch on the global scope.
global.fetch = require('node-fetch');

const username = 'admin';
const password = 'password';

function run() {
  const db = new DB(username, password);
  db.getId()
    .then(console.log.bind(console, 'your user id is:'))
    .catch(console.error.bind(console));
}

run();
