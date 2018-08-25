import KintoTestServer from "kinto-node-test-server";
import DB from '../shared/db';

// Kinto http needs fetch on the global scope.
global.fetch = require('node-fetch');

const ACTION_INIT = 'init';
const ACTION_FLUSH = 'flush';

const remote = process.env.KINTO_URL;
const username = process.env.KINTO_USER;
const password = process.env.KINTO_PASSWORD;

const action = process.argv[2];

function fail(message) {
  console.error(message);
  process.exit(1);
}

async function run() {
  if (!remote && !username && !password) {
    fail('No KINTO environment variables found. ' +
      'Hint: try copying .env_template to .env');
  }

  if (!remote) {
    fail('No kinto url specified');
  }

  if (!username) {
    fail('No kinto username specified');
  }

  if (!password) {
    fail('No kinto password specified');
  }

  if (!action) {
    fail('no command specificed');
  }

  try {
    let db, server;

    switch (action) {
      case ACTION_INIT:
        db = new DB(remote, username, password);
        await db.initDB();
        console.log('database initialized');
        break;

      case ACTION_FLUSH:
        server = new KintoTestServer(remote);
        await server.flush();
        console.log('database flushed');
        break;

      default:
        fail(`Unrecognized action: ${action}`);
        break;
    }

  } catch (err) {
    if (err.name === 'FetchError') {
      fail(`Could not connect to kinto host: ${remote}. ` +
        'Perhaps you need to start the service with docker-compose.');
    } else {
      fail(err.name, err.type, err.message);
    }
  }
}

run();
