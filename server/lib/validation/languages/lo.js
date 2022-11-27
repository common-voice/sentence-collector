// Lao rules
// use any rule from Thai rules https://github.com/common-voice/sentence-collector/blob/main/server/lib/validation/languages/th.js
const MIN_LENGTH = 2;
const MAX_LENGTH = 100;

const INVALIDATIONS = [{
  fn: (sentence) => {
    return sentence.length < MIN_LENGTH || sentence.length > MAX_LENGTH;
  },
  error: `Number of characters must be between ${MIN_LENGTH} and ${MAX_LENGTH} (inclusive)`,
}, {
  // Lao digits and Thai digits
  regex: /[0-9໑໒໓໔໕໖໗໘໙໐๐-๙]/,
  error: 'Sentence should not contain numbers',
}, {
  // English and Thai characters are not allowed
  regex: /[A-Za-zก-ฮ]/,
  error: 'Sentence should not contain latin alphabet characters or Thai characters',
}, {
  // < > + * \ # @ ^ [ ] ( ) /
  // ellipsis: \u0EAF ຯ
  // repetition: \u0EC6 ໆ
  regex: /[<>+*\\#@^[\]()/\u0EAF\u0EC6]/,
  error: 'Sentence should not contain symbols, including ellipsis and repetition',
}, {
  // Emoji range from https://www.regextester.com/106421 and
  // https://stackoverflow.com/questions/10992921/how-to-remove-emoji-code-using-javascript
  regex: /(\u00a9|\u00ae|[\u2000-\u3300]|[\u2580-\u27bf]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|[\ue000-\uf8ff])/,
  error: 'Sentence should not contain emojis or other special Unicode symbols',
}];

module.exports = {
  INVALIDATIONS,
};
