'use strict';

const fs = require('fs');
const mysql = require('mysql2/promise');
const languagesLib = require('../server/lib/languages');

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

(async function() {
  connection = await mysql.createPool({
    connectionLimit: CONNECTIONS || 50,
    host: HOSTNAME,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    charset: 'utf8mb4_bin',
  });

  locales = languagesLib.getAllLanguages();

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
    const sortedByApprovingVotes = content.sort((a, b) => b.valid.length - a.valid.length);
    console.log(`${sortedByApprovingVotes.length} sentences to migrate`);
    await Promise.all(sortedByApprovingVotes.map((sentenceInfo) => processSentence(sentenceInfo, locale.id)));
  }

  console.log('We are done!');
  process.exit(0);
})();

async function processSentence(sentenceInfo, localeId) {
  const createdAt = typeof sentenceInfo.createdAt !== 'undefined' ? new Date(sentenceInfo.createdAt) : new Date();
  const updatedAt = typeof sentenceInfo.last_modified !== 'undefined' ? new Date(sentenceInfo.last_modified) : new Date();

  const sentenceParams = {
    sentence: sentenceInfo.sentence,
    source: sentenceInfo.source || '',
    user: sentenceInfo.username,
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

async function insertVote(sentenceInfo, user, insertedId, approval) {
  let createdAt = typeof sentenceInfo.last_modified !== 'undefined' ? new Date(sentenceInfo.last_modified) : new Date();

  const voteTimestamp = sentenceInfo[`Sentences_Meta_UserVoteDate_${user}`];
  if (Number.isInteger(voteTimestamp)) {
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
