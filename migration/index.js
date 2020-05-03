'use strict';

const fs = require('fs');
const mysql = require('mysql2/promise');

const {
  SC_CONNECT,
  BACKUP_PATH,
} = process.env;

if (!SC_CONNECT || !BACKUP_PATH) {
  throw new Error('SC_CONNECT and BACKUP_PATH are required!');
}

let connection;
let locales;

(async function() {
  connection = await mysql.createConnection(SC_CONNECT);

  locales = await getLocales();

  const files = await fs.promises.readdir(BACKUP_PATH, { withFileTypes: true });
  const directories = files.filter((dirent) => dirent.isDirectory());
  const languages = directories.map((dirent) => dirent.name);

  for await (const language of languages) {
    console.log('Processing', language);
    const sentenceCollectorFilePath = `${BACKUP_PATH}/${language}/sentence-collector.json`;
    try {
      await fs.promises.access(sentenceCollectorFilePath, fs.constants.F_OK);
    } catch (error) {
      console.error(`${sentenceCollectorFilePath} does not exist, skipping..`);
      continue;
    }

    const locale = locales.find((locale) => locale.code === language);
    const localeId = locale.id;
    const fileContent = await fs.promises.readFile(sentenceCollectorFilePath, 'utf-8');
    const content = JSON.parse(fileContent);
    console.log(`${content.length} sentences to migrate`);
    for await (const sentenceInfo of content) {
      await processSentence(sentenceInfo, localeId);
    }
  }

  console.log('We are done!');
  process.exit(0);
})();

async function getLocales() {
  const response = await connection.query('SELECT * FROM Locales');
  return response[0];
}

async function processSentence(sentenceInfo, localeId) {
  const sentenceParams = {
    sentence: sentenceInfo.sentence,
    source: sentenceInfo.source || '',
    user: sentenceInfo.username,
    localeId,
    createdAt: new Date(sentenceInfo.createdAt),
    updatedAt: new Date(sentenceInfo.last_modified),
  };

  try {
    const insertedId = await insertSentence(sentenceParams);

    for await (const user of sentenceInfo.valid) {
      await insertVote(sentenceInfo, user, insertedId, true);
    }

    for await (const user of sentenceInfo.invalid) {
      await insertVote(sentenceInfo, user, insertedId, false);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function insertSentence(sentenceParams) {
  const insertedSentence = await connection.query('INSERT INTO Sentences SET ?', sentenceParams);
  return insertedSentence[0].insertId;
}

async function insertVote(sentenceInfo, user, insertedId, approval) {
  let createdAt = new Date(sentenceInfo.last_modified);

  const voteTimestamp = sentenceInfo[`Sentences_Meta_UserVoteDate_${user}`];
  if (voteTimestamp) {
    createdAt = new Date(voteTimestamp);
  }

  const voteParams = {
    approval,
    user,
    sentenceId: insertedId,
    createdAt,
    updatedAt: createdAt,
  };
  return connection.query('INSERT INTO Votes SET ?', voteParams);
}
