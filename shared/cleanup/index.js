import * as en from './languages/en';

const CLEANUPS = {
  en,
};

const DEFAULT_CLEANUP_LANGUAGE = 'en';
const DEFAULT_CLEANUP = CLEANUPS[DEFAULT_CLEANUP_LANGUAGE];

export function cleanupSentences(language, sentences) {
  const cleanup = getCleanupFor(language);

  const sorted = sortSentences(cleanup, sentences);
  const spaceCleaned = cleanSpaces(cleanup, sorted);
  return spaceCleaned;
}

function sortSentences(cleanup, sentences) {
  return cleanup.sortSentences(sentences);
}

function cleanSpaces(cleanup, sentences) {
  return cleanup.cleanSpaces(sentences);
}

function getCleanupFor(language) {
  return CLEANUPS[language] || DEFAULT_CLEANUP;
}