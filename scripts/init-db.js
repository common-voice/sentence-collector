import DB from '../shared/db';

// Kinto http needs fetch on the global scope.
global.fetch = require('node-fetch');

const username = 'admin';
const password = 'password';

async function run() {
  const db = new DB(username, password);

  try {
    await db.initDB();
    console.log('database initialized');
  } catch (err) {
    console.error('db initialization ERROR', err);
  }
}

run();
