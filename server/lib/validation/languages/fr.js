//see : https://github.com/common-voice/sentence-collector/blob/main/server/lib/validation/VALIDATION.md for more information

const tokenizeWords = require('talisman/tokenizers/words');

// Minimum of words that qualify as a sentence. 
const MIN_WORDS = 1;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_WORDS = 14;

const INVALIDATIONS = [{
  //[min..max] words
  fn: (sentence) => {
    const words = tokenizeWords(sentence);
    return words.length < MIN_WORDS || words.length > MAX_WORDS;
  },
  error: `Le nombre de mots doit être entre ${MIN_WORDS} et ${MAX_WORDS} (inclus)`,
}, {
  //no numbers
  regex: /[0-9]+/,
  error: 'Les phrases ne doivent pas contenir de nombres',
}, {
  //no symbols
  regex: /[<>+*#@%^[\]()/]/,
  error: 'Les phrases de doivent pas contenir de symboles (*, #, (, etc.)',
}, {
  // Any words consisting of uppercase letters or uppercase letters with a period
  // inbetween are considered abbreviations or acronyms.
  // This currently also matches fooBAR but we most probably don't want that either
  // as users wouldn't know how to pronounce the uppercase letters.
  regex: /[A-Z]{2,}|[A-Z]+\.*[A-Z]+/,
  error: 'Les phrases ne doivent pas contenir des abréviations ou sigles',
}];

module.exports = {
  INVALIDATIONS,
};
