 const {
  writeFileSync,
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
} = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cleanup = require('../server/lib/cleanup');

const CV_LANGUAGES_URL = 'https://raw.githubusercontent.com/mozilla/voice-web/main/locales/all.json';
const OUTPUT_TXT = 'sentence-collector.txt';

// Mapping from PONTOON locale -> SC locale code
const LANGUAGE_MAPPING = {
  'ne-NP': 'ne',
  'sv-SE': 'sv',
  'pa-IN': 'pa',
  'ckb': 'ku',
};

const {
  API_BASE_URL,
  COMMON_VOICE_PATH,
} = process.env;

if (!API_BASE_URL || !COMMON_VOICE_PATH) {
  throw new Error('API_BASE_URL and COMMON_VOICE_PATH are required!');
}

const exportPath = path.resolve(COMMON_VOICE_PATH, 'server', 'data');

(async () => {
  await startExport();
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
  const approvedSentencesUrl = `${API_BASE_URL}/sentences/text/approved/${dbLanguageCode}`;

  const approvedSentencesResponse = await fetch(approvedSentencesUrl);
  const approvedSentencesText = await approvedSentencesResponse.text();
  const approvedSentences = approvedSentencesText.split('\n');
  if (!approvedSentences || approvedSentences.length === 0 || approvedSentences[0] === '') {
    return;
  }

  console.log(`  - Found ${approvedSentences.length} approved sentences`);

  prepareExport(cvPath);

  console.log(`  - Cleaning up sentences`);
  const cleanedUpSentences = cleanup.cleanupSentences(dbLanguageCode, approvedSentences);
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