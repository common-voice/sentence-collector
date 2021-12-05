const tokenizeWords = require('talisman/tokenizers/words');

// Minimum of words that qualify as a sentence.
const MIN_WORDS = 1;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
// For now the same as default.
const MAX_WORDS = 14;

const INVALIDATIONS = [{
  fn: (sentence) => {
    const words = tokenizeWords(sentence);
    return words.length < MIN_WORDS || words.length > MAX_WORDS;
  },
  error: `Number of words must be between 1 and 14 (inclusive)`,
}, {
  regex: /[0-9\u06f0\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9]+/,
  error: 'Sentence should not contain numbers',
}, {
  regex: /[<>+*#@^[\]()/]/,
  error: 'Sentence should not contain symbols',
}, {
  regex: /[\u0649\u0643\u0622\u0625\u0623\u0629\u0624\u064a\u200c\u06c0\u062b\u0630\u0638\u0637\u0636\u0635]+/,
  error: 'Sentence should not contain non-Central-Kurdish characters',
}];

module.exports = {
  INVALIDATIONS,
};
