const {
  writeFileSync,
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
} = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const mysql = require('mysql2/promise');
const cleanup = require('../server/lib/cleanup');

require('dotenv').config({
  path: path.resolve('..', '.env'),
});

const CV_LANGUAGES_URL = 'https://raw.githubusercontent.com/mozilla/voice-web/master/locales/all.json';
const OUTPUT_TXT = 'sentence-collector.txt';

// Mapping from PONTOON locale -> SC locale code
const LANGUAGE_MAPPING = {
  'ne-NP': 'ne',
  'sv-SE': 'sv',
  'pa-IN': 'pa',
};

const {
  SC_CONNECT,
} = process.env;

if (!SC_CONNECT) {
  throw new Error('SC_CONNECT is required!');
}

const exportPath = path.resolve('..', process.env.COMMON_VOICE_PATH, 'server', 'data');

let connection;

(async () => {
  connection = await mysql.createConnection(SC_CONNECT);
  await startExport();
  connection.close();
})();

async function startExport() {
  const startTime = Date.now();
  const cvResponse = await fetch(CV_LANGUAGES_URL);
  const allCVLanguages = await cvResponse.json();

  for await (const languageCode of allCVLanguages) {
    await exportLanguage(languageCode);
  }

  const endTime = Date.now();
  console.log('Duration to export everything (ms): ', endTime - startTime);
}

async function exportLanguage(languageCode) {
  console.log(`Starting export for ${languageCode}..`);

  const dbLanguageCode = LANGUAGE_MAPPING[languageCode] || languageCode;
  const cvPath = `${exportPath}/${languageCode}`;

  const approvedQuery = `
    SELECT
        Sentences.id,
        Sentences.sentence
      FROM Sentences
      LEFT JOIN Votes ON (Votes.sentenceId = Sentences.id)
      WHERE Sentences.localeId = "${languageCode}"
      GROUP BY Sentences.id
      HAVING
        SUM(Votes.approval) >= 2`;
  const [approvedSentences] = await connection.query(approvedQuery);

  if (!approvedSentences || approvedSentences.length === 0) {
    return;
  }

  console.log(`  - Found ${approvedSentences.length} approved sentences`);

  prepareExport(cvPath);

  console.log(`  - Cleaning up sentences`);
  const sentencesOnly = approvedSentences.map((sentenceMeta) => sentenceMeta.sentence);
  const cleanedUpSentences = cleanup.cleanupSentences(dbLanguageCode, sentencesOnly);
  const dedupedSentences = dedupeSentences(dbLanguageCode, cleanedUpSentences, cvPath);

  writeExport(cvPath, dedupedSentences);
}

async function prepareExport(cvPath) {
  const pathExists = existsSync(cvPath);

  if (!pathExists) {
    mkdirSync(cvPath);
  }
}

async function writeExport(cvPath, sentences = []) {
  const dataPath = `${cvPath}/${OUTPUT_TXT}`;

  if (!sentences || sentences.length === 0) {
    return;
  }

  console.log(`  - Writing all sentences to ${dataPath}..`);
  writeFileSync(dataPath, sentences.join('\n'));
}

function dedupeSentences(languageCode, sentences, path) {
  const alreadyExistingCVSentences = getCVSentencesFor(languageCode, path);
  const dedupedSentences = Array.from(new Set(sentences));
  const numberOfDupes = sentences.length - dedupedSentences.length;
  console.log(`  - Got ${numberOfDupes} duplicated sentences in Sentence Collector..`);

  const cvSentences = alreadyExistingCVSentences.reduce((acc, sentence) => {
    acc[sentence] = true;
    return acc;
  }, {});
  const notAlreadyExistingInCV = dedupedSentences.filter((sentence) => !cvSentences.hasOwnProperty(sentence));
  console.log(`  - Got ${notAlreadyExistingInCV.length} sentences not already existing in CV..`);
  return notAlreadyExistingInCV;
}

function getCVSentencesFor(languageCode, path) {
  console.log(`  - Getting CV sentences for ${languageCode}..`);
  const allFileNames = readdirSync(path);
  const filesToCheck = allFileNames.filter((filename) => {
    return filename.endsWith('.txt') && filename !== OUTPUT_TXT;
  });
  const allExistingSentences = filesToCheck.reduce((sentences, file) => {
    const fileContent = readFileSync(`${path}/${file}`, 'utf-8');
    const fileSentences = fileContent.split('\n');
    return sentences.concat(fileSentences);
  }, []);
  console.log(`  - Got ${allExistingSentences.length} CV sentences..`);
  return allExistingSentences;
}