// Minimum of characters that qualify as a sentence.
const MIN_LENGTH = 3;

// Maximum of characters allowed per sentence to keep recordings in a manageable duration.
const MAX_LENGTH = 50;

const INVALIDATIONS = [{
  fn: (sentence) => {
    return sentence.length < MIN_LENGTH || sentence.length > MAX_LENGTH;
  },
  error: `字數必須要喺 ${MIN_LENGTH} 同  ${MAX_LENGTH} 之間`,
}, {
  regex: /[0-9]+/,
  error: "句子唔可以包含阿拉伯數字",
}, {
  regex: /[<>+*#@%^[\]()/]/,
  error: "句子唔可以有特殊符號",
}, {
  // 7 or more repeating characters in a row is likely a non-formal spelling or difficult to read.
  regex: /(.)\1{6}/,
  error: "唔可以有連續 7 個或以上重複字元",
}, {
  // Emoji range from https://www.regextester.com/106421 and
  // https://stackoverflow.com/questions/10992921/how-to-remove-emoji-code-using-javascript
  regex: /(\u00a9|\u00ae|[\u2000-\u3300]|[\u2580-\u27bf]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|[\ue000-\uf8ff])/,
  error: "句子唔可以含有 emoji 或者其他特殊 Unicode 符號",
}, {
  regex: /[\u5427\u5504\u5436](\s|\u3002|\u002E|\uFF0C|\u002C|$)/,
  error: '句子唔可以有官話語氣詞（例如吧、唄、吶）',
}];

module.exports = {
  INVALIDATIONS,
};
