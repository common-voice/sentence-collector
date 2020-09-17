'use strict';

const fs = require('fs');
const mysql = require('mysql2/promise');
const languagesLib = require('./lib/languages');

const {
  HOSTNAME = 'localhost',
  USERNAME,
  PASSWORD,
  DATABASE = 'sentencecollector',
  CONNECTIONS,
  BACKUP_PATH,
} = process.env;

if (!HOSTNAME || !USERNAME || !PASSWORD || !DATABASE || !BACKUP_PATH) {
  throw new Error('HOSTNAME, USERNAME, PASSWORD, DATABASE, and BACKUP_PATH are required!');
}

let connection;
let locales;
let userIdCache = {};

const connectionLimit = parseInt(CONNECTIONS, 10) || 50;
console.log(`Using max ${connectionLimit} connections..`);

(async function() {
  connection = await mysql.createPool({
    connectionLimit,
    host: HOSTNAME,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    charset: 'utf8mb4_bin',
  });

  console.log('Successfully connected to DB!');

  locales = languagesLib.getAllLanguages();

  const files = await fs.promises.readdir(BACKUP_PATH, { withFileTypes: true });
  const directories = files.filter((dirent) => dirent.isDirectory());
  const languages = directories.map((dirent) => dirent.name);

  await initCleanup();

  for (const language of languages) {
    console.log('Processing', language);
    const sentenceCollectorFilePath = `${BACKUP_PATH}/${language}/sentence-collector.json`;
    try {
      await fs.promises.access(sentenceCollectorFilePath, fs.constants.F_OK);
    } catch (error) {
      console.error(`${sentenceCollectorFilePath} does not exist, skipping..`);
      continue;
    }

    const scLanguage = languagesLib.LANGUAGE_MAPPING[language] || language;
    const locale = locales.find((locale) => locale.id === scLanguage);
    const fileContent = await fs.promises.readFile(sentenceCollectorFilePath, 'utf-8');
    const content = JSON.parse(fileContent);
    console.log(`${content.length} sentences to migrate`);

    const allUsers = [...new Set(content.map((sentences) => sentences.username))];
    console.log(`${allUsers.length} users to create`);

    for (const user of allUsers) {
      if (!userIdCache[user]) {
        userIdCache[user] = await createUser(user);
      }
    }

    await Promise.all(content.map((sentence) => processSentence(sentence, locale.id)));
  }

  console.log('We are done!');
  process.exit(0);
})();

async function initCleanup() {
  console.log('Initial cleanup');
  await connection.query('DELETE FROM Users');
  await connection.query('DELETE FROM Sentences');
  await connection.query('DELETE FROM Votes');
}

async function createUser(username) {
  const dummyEmail = `${username}@sentencecollector.local`;
  const [insertedRecord] = await connection.query('INSERT INTO Users SET ?', { email: dummyEmail, createdAt: new Date(), updatedAt: new Date() });
  return insertedRecord.insertId;
}

async function processSentence(sentenceInfo, localeId) {
  const createdAt = typeof sentenceInfo.createdAt !== 'undefined' ? new Date(sentenceInfo.createdAt) : new Date();
  const updatedAt = typeof sentenceInfo.last_modified !== 'undefined' ? new Date(sentenceInfo.last_modified) : new Date();

  const sentenceParams = {
    sentence: sentenceInfo.sentence,
    source: sentenceInfo.source || '',
    userId: `${sentenceInfo.username}@sentencecollector.local`,
    localeId,
    createdAt,
    updatedAt,
  };

  try {
    const insertedId = await insertSentence(sentenceParams);
    await Promise.all([
      ...sentenceInfo.valid.map((user) => insertVote(sentenceInfo, user, insertedId, true)),
      ...sentenceInfo.invalid.map((user) => insertVote(sentenceInfo, user, insertedId, false)),
    ]);
  } catch (error) {
    console.log(error.message);
  }
}

async function insertSentence(sentenceParams) {
  const insertedSentence = await connection.query('INSERT INTO Sentences SET ?', sentenceParams);
  return insertedSentence[0].insertId;
}

async function insertVote(sentenceInfo, username, insertedId, approval) {
  let createdAt = typeof sentenceInfo.last_modified !== 'undefined' ? new Date(sentenceInfo.last_modified) : new Date();

  const voteTimestamp = sentenceInfo[`Sentences_Meta_UserVoteDate_${username}`];
  if (Number.isInteger(voteTimestamp)) {
    createdAt = new Date(voteTimestamp);
  }

  const voteParams = {
    approval,
    userId: `${username}@sentencecollector.local`,
    sentenceId: insertedId,
    createdAt,
    updatedAt: createdAt,
  };
  return connection.query('INSERT INTO Votes SET ?', voteParams);
}
