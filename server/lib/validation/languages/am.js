const tokenizeWords = require('talisman/tokenizers/words');

// Minimum of words that qualify as a sentence.
const MIN_WORDS = 3;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_WORDS = 15;

const INVALIDATIONS = [{
  fn: (sentence) => {
    const words = tokenizeWords(sentence);
    return words.length < MIN_WORDS || words.length > MAX_WORDS;
  },
  error: `በአረፍተነገሩ ውስጥ ያለው የቃላት ቁጥር በ ${MIN_WORDS} እና ${MAX_WORDS} መሆን አለበት (የሚጠቃለል)`,
}, {
  regex: /[0-9]+/,
  error: 'አረፍተነገሩ ውስጥ ቁጥር ሊኖር አይገባም ወይም ቁጥሩን በአማርኛ ተርጉመው ያስተካክሉት እባክዎ',
},{
  regex: /[A-Za-z]+/,
  error: 'አረፍተነገሩ ውስጥ በእንግሊዘኛ ፊደል የተጻፈ ነገር ካለ እባክዎ ይተርጉሙት ወይም ያስወግዱት',
}, {
  regex: /[<>+*#@%'"^[\]()/]/,
  error: 'አረፍተነገሩ ውስጥ የተለዩ ምልክቶች ሊኖሩ አይገባም እባክዎ ያስተካክሉ',
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
