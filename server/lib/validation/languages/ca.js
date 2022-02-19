const tokenizeWords = require('talisman/tokenizers/words/gersam');

// Minimum of words that qualify as a sentence.
const MIN_WORDS = 1;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_WORDS = 14;

const INVALIDATIONS = [{
  fn: (sentence) => {
    const words = tokenizeWords('ca', sentence);
    return words.length < MIN_WORDS || words.length > MAX_WORDS;
  },
  error: `Number of words must be between ${MIN_WORDS} and ${MAX_WORDS} (inclusive)`,
}, {
  regex: /[0-9]+/,
  error: 'Sentence should not contain numbers',
}, {
  // This could mean multiple sentences per line.
  regex: /[?!.].+/,
  error: 'Sentence should not contain sentence punctuation inside a sentence',
}, {
  // Symbols not allowed, also add them below as well to the regex:
  // < > + * \ # @ ^ “ ” ‘ ’ ( ) [ ] / { }
  regex: /[<>+*\\#@^“”‘’(){}[\]/]|\s{2,}|!{2,}/,
  error: 'Sentence should not contain symbols or multiple spaces/exclamation marks',
}, {
  // Any words consisting of uppercase letters or uppercase letters with a period
  // inbetween are considered abbreviations or acronyms.
  // This currently also matches fooBAR but we most probably don't want that either
  // as users wouldn't know how to pronounce the uppercase letters.
  regex: /[A-Z]{2,}|[A-Z]+\.*[A-Z]+/,
  error: 'Sentence should not contain abbreviations',
}];

module.exports = {
  INVALIDATIONS,
};
