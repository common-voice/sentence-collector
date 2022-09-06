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
  error: `Number of words must be between ${MIN_WORDS} and ${MAX_WORDS} (inclusive) - Le nombre de mot doit être entre ${MIN_WORDS} et ${MAX_WORDS} (inclus)`,
}, {
  regex: /[0-9]+/,
  error: 'Sentence should not contain numbers - les phrases ne doivent pas contenir de nombres',
}, {
  regex: /[<>+*#@%^[\]()/]/,
  error: 'Sentence should not contain symbols - les phrases de doivent pas contenir de symboles \(\*, \#, \(, etc\)',
}, {
  // Any words consisting of uppercase letters or uppercase letters with a period
  // inbetween are considered abbreviations or acronyms.
  // This currently also matches fooBAR but we most probably don't want that either
  // as users wouldn't know how to pronounce the uppercase letters.
  regex: /[A-Z]{2,}|[A-Z]+\.*[A-Z]+/,
  error: 'Sentence should not contain abbreviations - Les phrases ne doivent pas contenir des abréviations ou sigles',
}];

module.exports = {
  INVALIDATIONS,
};
