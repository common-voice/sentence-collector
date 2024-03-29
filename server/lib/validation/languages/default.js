const tokenizeWords = require('talisman/tokenizers/words');

const TRANSLATION_KEY_PREFIX = 'TRANSLATION_KEY:';

// Minimum of words that qualify as a sentence.
const MIN_WORDS = 1;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_WORDS = 14;

const INVALIDATIONS = [{
  fn: (sentence) => {
    const words = tokenizeWords(sentence);
    return words.length < MIN_WORDS || words.length > MAX_WORDS;
  },
  error: `${TRANSLATION_KEY_PREFIX}sc-validation-number-of-words`,
}, {
  regex: /[0-9]+/,
  error: `${TRANSLATION_KEY_PREFIX}sc-validation-no-numbers`,
}, {
  regex: /[<>+*#@%^[\]()/]/,
  error: `${TRANSLATION_KEY_PREFIX}sc-validation-no-symbols`,
}, {
  // Any words consisting of uppercase letters or uppercase letters with a period
  // in-between are considered abbreviations or acronyms.
  // This currently also matches fooBAR but we most probably don't want that either
  // as users wouldn't know how to pronounce the uppercase letters.
  regex: /[A-Z]{2,}|[A-Z]+\.*[A-Z]+/,
  error: `${TRANSLATION_KEY_PREFIX}sc-validation-no-abbreviations`,
}];

module.exports = {
  INVALIDATIONS,
};
