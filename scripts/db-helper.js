import KintoTestServer from "kinto-node-test-server";
import DB from '../shared/db';
import { fail } from './util';
import { startExport } from './exporter';
// import generate from './generate-cv-metadata';

// Kinto http needs fetch on the global scope.
global.fetch = require('node-fetch');

const ACTION_INIT = 'init';
const ACTION_FLUSH = 'flush';
const ACTION_LIST_USERS = 'list';
const ACTION_EXPORT = 'export';
const ACTION_DELETE = 'delete';

const system = process.env.SC_SYSTEM;
const remote = process.env.KINTO_URL_LOCAL;
const prodRemote = process.env.KINTO_URL_PROD;
const username = process.env.KINTO_USER;
const password = process.env.KINTO_PASSWORD;
const exportPath = process.env.COMMON_VOICE_PATH + '/server/data';

const action = process.argv[2];

async function flushKinto() {
  const server = new KintoTestServer(remote);
  await server.flush();
}

async function listUsers() {
  const db = new DB(remote, username, password);
  const users = await db.getUsers();
  console.log('users', users);
  return users;
}

async function exportDB() {
  const remoteHost = system === 'production' ? prodRemote : remote;
  const db = new DB(remoteHost, username, password);
  await startExport(db, exportPath);
}

async function initDB() {
  const db = new DB(remote, username, password);
  await db.initDB();
  //TODO: log something back from init, similar to like we did with cv data below


  // For now we're not importing any CV data
  // const metadata = await generate();
  // const { languages, sentences } = await db.initCV(metadata);
  // console.log(`Common Voice: ${sentences.length} sentences in ${languages.length} languages`);

  const authed = await db.auth();
  if (!authed) {
    fail('db admin must be authed user');
  }
}

async function deleteSentences() {
  const remoteHost = system === 'production' ? prodRemote : remote;
  const db = new DB(remoteHost, username, password);
  await db.deleteSentenceRecords();
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
    switch (action) {
      case ACTION_INIT:
        await initDB();
        console.log('database initialized');
        break;

      case ACTION_FLUSH:
        await flushKinto();
        console.log('database flushed');
        break;

      case ACTION_LIST_USERS:
        await listUsers();
        break;

      case ACTION_EXPORT:
        await exportDB();
        break;

      case ACTION_DELETE:
        await deleteSentences();
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
      fail(err);
    }
  }
}

run();
