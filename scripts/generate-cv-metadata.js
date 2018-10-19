import path from 'path';

import {
  fail,
  getRelPathToRoot,
  getSubDirs,
  getSentencesFromFile,
  getTextFiles,
} from './util';
import { flat } from '../shared/util';

const CV_PATH = process.env.COMMON_VOICE_PATH;
const CV_TEXT_DIR = CV_PATH + '/server/data/';
const INPUT_DIR = getRelPathToRoot(CV_TEXT_DIR);

function getLangDir(language) {
  return path.join(INPUT_DIR, language);
}

async function getSentencesForLanguage(language) {
  const textFiles = await getTextFiles(getLangDir(language));
  const fullPaths = textFiles.map(f => path.join(getLangDir(language), f));
  const results = await Promise.all(fullPaths.map(f => {
    return getSentencesFromFile(f);
  }));

  // Flatten the result arrays into a single array.
  return flat(results);
}

const main = async () => {
  if (!CV_PATH) {
    fail('No Common Voice path found. ' +
      'Hint: try copying .env_template to .env');
  }

  try {
    const cvTextDir = INPUT_DIR;
    const languages = await getSubDirs(cvTextDir);

    let metadata = [];
    for (let i = 0; i < languages.length; i++) {
      const language = languages[i];
      const sentences = await getSentencesForLanguage(language);
      metadata.push({
        language,
        sentences,
      });
    }

    return metadata;
  } catch (err) {
    fail('Top level error: ' + err);
  }
};

// Poor man's 'main' detection. Used since parcel overrides require.main.
if (__filename === process.argv[1]) {
  main().then(async metadata => {
    const conciseMeta = metadata.map(data => ({
      language: data.language,
      sentences: data.sentences.length,
    }));
    console.log(JSON.stringify(conciseMeta, null, 2));
  });
}

module.exports = main;
