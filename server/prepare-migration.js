'use strict';

const fs = require('fs');
const path = require('path');

(async function() {
  const sentenceCollectorFilePath = path.resolve(__dirname, '..', 'data', 'kab', 'sentence-collector.json');
  try {
    await fs.promises.access(sentenceCollectorFilePath, fs.constants.F_OK);
  } catch (error) {
    console.error(`${sentenceCollectorFilePath} does not exist, skipping..`);
    process.exit(1);
  }

  console.log('Reading file...');
  const content = await getFileContent(sentenceCollectorFilePath);
  console.log(`${content.length} sentences in file`);
  global.gc();

  const filteredSentences = content.filter((info) => {
    return info.source != 'https://github.com/Igiderilelli?tab=projects';
  });
  global.gc();

  console.log(`${filteredSentences.length} left after cleanup.`);
  console.log('Writing file...');

  await fs.promises.writeFile(sentenceCollectorFilePath, JSON.stringify(filteredSentences));

  console.log('We are done!');
  process.exit(0);
})();

async function getFileContent(path) {
  const fileContent = await fs.promises.readFile(path, 'utf-8');
  return JSON.parse(fileContent);
}
