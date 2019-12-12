import {
  writeFileSync,
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
} from 'fs';
import * as validation from '../shared/validation';
import * as cleanup from '../shared/cleanup';

const CV_LANGUAGES_URL = 'https://raw.githubusercontent.com/mozilla/voice-web/master/locales/all.json';
const OUTPUT_TXT = 'sentence-collector.txt';

// Mapping from PONTOON locale -> database locale code
const LANGUAGE_MAPPING = {
  'ne-NP': 'ne',
  'sv-SE': 'sv',
};

export async function startBackup(db, exportPath) {
  const startTime = Date.now();
  const allLanguages = await db.getLanguages();

  for (const languageCode of allLanguages) {
    await backupAllLanguage(db, languageCode, exportPath);
  }

  const endTime = Date.now();
  console.log('Duration to backup everything (ms): ', endTime - startTime);
}

export async function startExport(db, exportPath) {
  const startTime = Date.now();
  const cvResponse = await fetch(CV_LANGUAGES_URL);
  const allCVLanguages = await cvResponse.json();

  for (const languageCode of allCVLanguages) {
    await exportLanguage(db, languageCode, exportPath);
  }

  const endTime = Date.now();
  console.log('Duration to export everything (ms): ', endTime - startTime);
}

async function exportLanguage(db, languageCode, exportPath) {
  console.log(`Starting export for ${languageCode}..`);

  const dbLanguageCode = LANGUAGE_MAPPING[languageCode] || languageCode;
  const cvPath = `${exportPath}/${languageCode}`;
  let approvedSentences = [];
  try {
    approvedSentences = await db.getAllValidatedSentences(dbLanguageCode);
  } catch (err) { /* ignore for now, as we also get this if the code does not exist */ }

  if (!approvedSentences || approvedSentences.length === 0) {
    return;
  }

  console.log(`  - Found ${approvedSentences.length} approved sentences`);

  const validatedSentences = getValidatedSentences(dbLanguageCode, approvedSentences);

  if (!validatedSentences) {
    console.log(`  - Found no valid sentences, not writing any output..`);
    return;
  }

  prepareExport(cvPath);

  console.log(`  - Cleaning up sentences`);
  const sentencesOnly = validatedSentences.map((sentenceMeta) => sentenceMeta.sentence);
  const cleanedUpSentences = cleanup.cleanupSentences(dbLanguageCode, sentencesOnly);
  const dedupedSentences = dedupeSentences(dbLanguageCode, cleanedUpSentences, cvPath);

  writeExport(cvPath, validatedSentences, dedupedSentences);
}

async function prepareExport(cvPath) {
  const pathExists = existsSync(cvPath);

  if (!pathExists) {
    mkdirSync(cvPath);
  }
}

async function writeExport(cvPath, metaData, sentences = []) {
  const dataPath = `${cvPath}/${OUTPUT_TXT}`;

  if (!sentences || sentences.length === 0) {
    return;
  }

  console.log(`  - Writing all sentences to ${dataPath}..`);
  writeFileSync(dataPath, sentences.join('\n'));
}

async function backupAllLanguage(db, languageCode, exportPath) {
  console.log(`Starting backup for ${languageCode}..`);

  const dbLanguageCode = LANGUAGE_MAPPING[languageCode] || languageCode;
  const cvPath = `${exportPath}/${languageCode}`;
  let sentences = [];
  try {
    sentences = await db.getAllSentences(dbLanguageCode);
  } catch (err) { /* ignore for now, as we also get this if the code does not exist */ }

  if (!sentences || sentences.length === 0) {
    return;
  }

  console.log(`  - Found ${sentences.length} sentences`);

  prepareExport(cvPath);
  writeExport(cvPath, sentences);
}

function getValidatedSentences(languageCode, sentences) {
  const sentencesOnly = sentences.map((sentenceMeta) => sentenceMeta.sentence);
  const { filtered } = validation.validateSentences(languageCode, sentencesOnly);
  const filteredSentences = filtered.map((filteredResult) => filteredResult.sentence);
  filteredSentences.length > 0 &&
    console.log(`  - Filtered ${filteredSentences.length} sentences`, filteredSentences);

  const filteredSentenceMetas = sentences.filter((sentenceMeta) => {
    return !filteredSentences.includes(sentenceMeta.sentence);
  });
  console.log(`  - Found ${filteredSentenceMetas.length} valid sentences`);
  return filteredSentenceMetas;
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