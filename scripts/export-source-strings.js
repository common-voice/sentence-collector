// We are handling translations within the Common Voice repository.
// Therefore we export the source translation strings on every export
// and then they get translated in the Common Voice Pontoon infrastructure.
// Translated strings are pulled back in when building Sentence Collector
// on deployments.

const {
  readFile,
  writeFile,
} = require('fs/promises');
const path = require('path');

const {
  COMMON_VOICE_PATH,
} = process.env;

if (!COMMON_VOICE_PATH) {
  throw new Error('COMMON_VOICE_PATH is required!');
}

const sentenceCollectorFTLPath = path.resolve(__dirname, '..', 'web', 'locales', 'en', 'messages.ftl');
const commonVoiceFTLPath = path.resolve(COMMON_VOICE_PATH, 'web', 'locales', 'en', 'messages.ftl');

const PREAMBLE = '# [SentenceCollector]';
const POSTAMBLE = '# [/SentenceCollector]';

(async () => {
  await appendSentenceCollectorStrings();
})();

async function appendSentenceCollectorStrings() {
  console.log('Cleaning Sentence Collector entries from: ', commonVoiceFTLPath);
  const cvFTLContent = await readFile(commonVoiceFTLPath, 'utf8');
  const cvLines = cvFTLContent.split('\n');
  const preambleIndex = cvLines.indexOf(PREAMBLE);
  const postambleIndex = cvLines.indexOf(POSTAMBLE);

  console.log('Getting Sentence Collector entries from: ', sentenceCollectorFTLPath);
  const scFTLContent = await readFile(sentenceCollectorFTLPath, 'utf8');
  const scFTLLines = scFTLContent.split('\n').filter((line) => line !== '' && !line.startsWith('#'));

  console.log('Preparing combined file...');
  cvLines.splice(preambleIndex + 1, postambleIndex - preambleIndex - 1, ...scFTLLines);

  console.log('Writing new file to: ', commonVoiceFTLPath);
  await writeFile(commonVoiceFTLPath, cvLines.join('\n'));
}
