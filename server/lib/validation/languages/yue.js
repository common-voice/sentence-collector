// Minimum of words that qualify as a sentence.
const MIN_LENGTH = 3;

// Maximum of words allowed per sentence to keep recordings in a manageable duration.
const MAX_LENGTH = 50;

const INVALIDATIONS = [{
  fn: (sentence) => {
    return sentence.length < MIN_LENGTH || sentence.length > MAX_LENGTH;
  },
  error: `Number of characters must be between ${MIN_LENGTH} and ${MAX_LENGTH} (inclusive)`,
},
{
  regex: /[0-9]+/,
  error: "Sentence should not contain numbers",
},
{
  regex: /[<>+*#@%^[\]()\/]/,
  error: "Sentence should not contain symbols",
},
{
  // Any words consisting of uppercase letters or uppercase letters with a period
  // inbetween are considered abbreviations or acronyms.
  // This currently also matches fooBAR but we most probably don't want that either
  // as users wouldn't know how to pronounce the uppercase letters.
  regex: /[A-Z]{2,}|[A-Z]+\.*[A-Z]+/,
  error: "Sentence should not contain abbreviations",
},
{
  // 7 or more repeating characters in a row is likely a non-formal spelling or difficult to read.
  regex: /(.)\1{6}/,
  error: "Sentence should not contain more than 7 of the same character in a row",
},
{
  // Emoji range from https://www.regextester.com/106421 and
  // https://stackoverflow.com/questions/10992921/how-to-remove-emoji-code-using-javascript
  regex: /(\u00a9|\u00ae|[\u2000-\u3300]|[\u2580-\u27bf]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|[\ue000-\uf8ff])/,
  error: "Sentence should not contain emojis or other special Unicode symbols",
}];

module.exports = {
  INVALIDATIONS,
};