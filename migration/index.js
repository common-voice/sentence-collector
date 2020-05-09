'use strict';

const fs = require('fs');
const mysql = require('mysql2/promise');
const languagesLib = require('../server/lib/languages');

const {
  SC_CONNECT,
  BACKUP_PATH,
} = process.env;

if (!SC_CONNECT || !BACKUP_PATH) {
  throw new Error('SC_CONNECT and BACKUP_PATH are required!');
}

let connection;
let locales;
let currentIndex = 1;

(async function() {
  connection = await mysql.createConnection(SC_CONNECT);
  await connection.query('SET unique_checks=0');
  await connection.query('SET foreign_key_checks=0');

  locales = await getLocales();

  const files = await fs.promises.readdir(BACKUP_PATH, { withFileTypes: true });
  const directories = files.filter((dirent) => dirent.isDirectory());
  const languages = directories.map((dirent) => dirent.name);

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
    await Promise.all(content.map((sentenceInfo, index) => processSentence(sentenceInfo, locale.id, currentIndex + index)));
    currentIndex = currentIndex + content.length;
  }

  console.log('We are done!');
  await connection.query('SET unique_checks=1');
  await connection.query('SET foreign_key_checks=1');
  connection.close();
})();

async function getLocales() {
  const response = await connection.query('SELECT * FROM Locales');
  return response[0];
}

async function processSentence(sentenceInfo, localeId, id) {
  const sentenceParams = {
    id,
    sentence: sentenceInfo.sentence,
    source: sentenceInfo.source || '',
    user: sentenceInfo.username,
    localeId,
    createdAt: new Date(sentenceInfo.createdAt),
    updatedAt: new Date(sentenceInfo.last_modified),
  };

  try {
    await Promise.all([
      insertSentence(sentenceParams),
      ...sentenceInfo.valid.map((user) => insertVote(sentenceInfo, user, id, true)),
      ...sentenceInfo.invalid.map((user) => insertVote(sentenceInfo, user, id, false)),
    ]);
  } catch (error) {
    console.log(error.message);
  }
}

function insertSentence(sentenceParams) {
  return connection.query('INSERT INTO Sentences SET ?', sentenceParams);
}

async function insertVote(sentenceInfo, user, sentenceId, approval) {
  let createdAt = new Date(sentenceInfo.last_modified);

  const voteTimestamp = sentenceInfo[`Sentences_Meta_UserVoteDate_${user}`];
  if (voteTimestamp) {
    createdAt = new Date(voteTimestamp);
  }

  const voteParams = {
    approval,
    user,
    sentenceId,
    createdAt,
    updatedAt: createdAt,
  };
  return connection.query('INSERT INTO Votes SET ?', voteParams);
}
