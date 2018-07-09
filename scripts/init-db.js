import DB from '../shared/js/db';

// Kinto http needs fetch on the global scope.
global.fetch = require('node-fetch');

const username = 'admin';
const password = 'password';

function run() {
  const db = new DB(username, password);
  db.init()
    .then(console.log.bind(console, 'database initialized'))
    .catch(console.error.bind(console));
}

run();
