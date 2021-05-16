const tokenizeWords = require('talisman/tokenizers/words');

// Minimum of words that qualify as a sentence.
const MIN_WORDS = 1;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_WORDS = 14;

const INVALIDATIONS = [{
  fn: (sentence) => {
    const words = tokenizeWords(sentence);
    return words.length < MIN_WORDS || words.length > MAX_WORDS;
  },
  error: `Number of words must be between ${MIN_WORDS} and ${MAX_WORDS} (inclusive)`,
}, {
  regex: /[0-9]+/,
  error: 'Sentence should not contain numbers',
}, {
  regex: /[<>+*#@^[\]()/]/,
  error: 'Sentence should not contain symbols',
}, {
  regex: /[А-Я]{2,}|[А-Я]+\.*[А-Я]+/,
  error: 'Sentence should not contain abbreviations',
}, {
  regex: /[a-zA-Z]/,
  error: 'Sentence should not contain latin alphabet characters',
}];

module.exports = {
  INVALIDATIONS,
};
