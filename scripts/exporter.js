import {
  writeFileSync,
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
} from 'fs';
import * as validation from '../shared/validation';
import * as cleanup from '../shared/cleanup';

import { getAllLanguages } from '../shared/languages';
// const CV_LANGUAGES_URL = 'https://raw.githubusercontent.com/mozilla/voice-web/master/locales/all.json';
const OUTPUT_JSON = 'sentence-collector.json';
const OUTPUT_TXT = 'sentence-collector.txt';

// Mapping from PONTOON locale -> database locale code
const LANGUAGE_MAPPING = {
  'ne-NP': 'ne',
  'sv-SE': 'sv',
};

export async function startExport(db, exportPath) {
  const startTime = Date.now();
  // const cvResponse = await fetch(CV_LANGUAGES_URL);
  // const allCVLanguages = await cvResponse.json();
  const allCVLanguages = getAllLanguages().map((lang) => lang.code);

  for (const languageCode of allCVLanguages) {
    await exportLanguage(db, languageCode, exportPath);
  }

  const endTime = Date.now();
  console.log('Duration to export everything (ms): ', endTime - startTime);
}

async function exportLanguage(db, languageCode, exportPath) {
  console.log(`Starting export for ${languageCode}..`);
  const cvPath = `${exportPath}/${languageCode}`;
  const dbLanguageCode = LANGUAGE_MAPPING[languageCode] || languageCode;

  const pathExists = existsSync(cvPath);

  if (!pathExists) {
    mkdirSync(cvPath);
  }

  const metaDataPath = `${cvPath}/${OUTPUT_JSON}`;
  const dataPath = `${cvPath}/${OUTPUT_TXT}`;

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

  console.log(`  - Writing all meta data to ${metaDataPath}..`);
  writeFileSync(metaDataPath, JSON.stringify(validatedSentences));

  console.log(`  - Cleaning up sentences`);
  const sentencesOnly = validatedSentences.map((sentenceMeta) => sentenceMeta.sentence);
  const cleanedUpSentences = cleanup.cleanupSentences(dbLanguageCode, sentencesOnly);
  const dedupedSentences = dedupeSentences(dbLanguageCode, cleanedUpSentences, cvPath);

  console.log(`  - Writing all sentences to ${dataPath}..`);
  writeFileSync(dataPath, dedupedSentences.join('\n'));
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
  const alreadyExistingSentences = getCVSentencesFor(languageCode, path);
  const nonDupes = sentences.filter((sentence) => !alreadyExistingSentences.includes(sentence));
  console.log(`  - Got ${nonDupes.length} sentences not already existing in CV..`);
  return nonDupes;
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