import KintoTestServer from 'kinto-node-test-server';
import { readFileSync } from 'fs';
import DB from '../shared/db';
import { fail } from './util';
import { startExport, startBackup } from './exporter';

// Kinto http needs fetch on the global scope.
global.fetch = require('node-fetch');

const ACTION_INIT = 'init';
const ACTION_FLUSH = 'flush';
const ACTION_LIST_USERS = 'list';
const ACTION_BACKUP = 'backup';
const ACTION_EXPORT = 'export';
const ACTION_DELETE = 'delete';
const ACTION_DELETE_SPECIFIC = 'delete-specific';
const ACTION_FORCE_DELETE_SPECIFIC = 'force-delete-specific';
const ACTION_FORCE_DELETE_FILE = 'force-delete-file';
const ACTION_DELETE_VOTES = 'delete-votes';
const ACTION_APPROVAL_CHECK = 'correct-approvals';

const system = process.env.SC_SYSTEM;
const remote = process.env.KINTO_URL_LOCAL;
const prodRemote = process.env.KINTO_URL_PROD;
const prodRemoteIP = process.env.KINTO_IP_PROD;
const username = process.env.KINTO_USER;
const password = process.env.KINTO_PASSWORD;
const exportPath = process.env.COMMON_VOICE_PATH + '/server/data';
const deleteLocale = process.env.DELETE_SPECIFIC_LOCALE;
const deleteUsername = process.env.DELETE_SPECIFIC_USERNAME;
const deleteFile = process.env.DELETE_SPECIFIC_SENTENCES_FILE;
const approvalOnly = /true/.test(process.env.DELETE_APPROVAL_ONLY);
const DRY_RUN = /true/.test(process.env.DRY_RUN);

const action = process.argv[2];
const locale = process.argv[3];

async function flushKinto() {
  const server = new KintoTestServer(remote);
  await server.flush();
}

async function listUsers() {
  const remoteHost = system === 'production' ? prodRemote : remote;
  const db = new DB(remoteHost, username, password);
  const users = await db.getUsers();
  console.log('number of users', users.length);
  return users;
}

async function exportDB() {
  const remoteHost = system === 'production' ? prodRemoteIP : remote;
  const db = new DB(remoteHost, username, password);
  await startExport(db, exportPath);
}

async function backupDB() {
  const remoteHost = system === 'production' ? prodRemoteIP : remote;
  const db = new DB(remoteHost, username, password);
  await startBackup(db, exportPath);
}

async function initDB() {
  const db = new DB(remote, username, password);
  await db.initDB();

  const authed = await db.auth();
  if (!authed) {
    fail('db admin must be authed user');
  }
}

async function deleteSentences() {
  const remoteHost = system === 'production' ? prodRemoteIP : remote;
  const db = new DB(remoteHost, username, password);
  await db.deleteSentenceRecords();
}

async function deleteSpecificSentences() {
  const remoteHost = system === 'production' ? prodRemoteIP : remote;
  const db = new DB(remoteHost, username, password);
  if (!deleteLocale || !deleteUsername) {
    fail('DELETE_SPECIFIC_LOCALE and DELETE_SPECIFIC_USERNAME are required');
  }



  await db.deleteSpecificSentenceRecords(deleteLocale, deleteUsername);
}

async function forceDeleteFile() {
  const remoteHost = system === 'production' ? prodRemoteIP : remote;
  const db = new DB(remoteHost, username, password);
  if (!deleteLocale || !deleteFile) {
    fail('DELETE_SPECIFIC_LOCALE and DELETE_SPECIFIC_SENTENCES_FILE are required');
  }

  const sentencesFileContent = readFileSync(deleteFile, 'utf8');
  const sentences = sentencesFileContent.split('\n').filter(Boolean);
  if (!sentences) {
    console.error('NO_SENTENCES_SPECIFIED');
    return;
  }

  await db.forceDeleteSentences(deleteLocale, sentences, DRY_RUN);
}

async function forceDeleteSpecificSentences() {
  const remoteHost = system === 'production' ? prodRemoteIP : remote;
  const db = new DB(remoteHost, username, password);
  if (!deleteLocale || !deleteUsername) {
    fail('DELETE_SPECIFIC_LOCALE and DELETE_SPECIFIC_USERNAME are required');
  }

  await db.forceDeleteSpecificSentenceRecords(deleteLocale, deleteUsername);
}

async function correctApprovals(locale) {
  const remoteHost = system === 'production' ? prodRemoteIP : remote;
  const db = new DB(remoteHost, username, password);
  await db.correctApprovals(locale);
}

async function deleteVotes() {
  const remoteHost = system === 'production' ? prodRemoteIP : remote;
  const db = new DB(remoteHost, username, password);
  if (!deleteLocale || !deleteUsername) {
    fail('DELETE_SPECIFIC_LOCALE and DELETE_SPECIFIC_USERNAME are required');
  }

  await db.deleteVotes(deleteLocale, deleteUsername, approvalOnly);
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

      case ACTION_BACKUP:
        await backupDB();
        break;

      case ACTION_EXPORT:
        await exportDB();
        break;

      case ACTION_DELETE:
        await deleteSentences();
        break;

      case ACTION_DELETE_SPECIFIC:
        await deleteSpecificSentences();
        break;

      case ACTION_FORCE_DELETE_SPECIFIC:
        await forceDeleteSpecificSentences();
        break;

      case ACTION_FORCE_DELETE_FILE:
        await forceDeleteFile();
        break;

      case ACTION_DELETE_VOTES:
        await deleteVotes();
        break;

      case ACTION_APPROVAL_CHECK:
        if (!locale) {
          throw new Error('NO_LOCALE_SPECIFIED');
        }

        await correctApprovals(locale);
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
