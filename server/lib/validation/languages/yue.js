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
  // No Arabic numbers.
  regex: /[0-9]+/,
  error: "句子唔可以包含阿拉伯數字",
}, {
  // No special symbols or spaces
  regex: /[\s<>+*#@%^[\]()/]/,
  error: "句子唔可以有特殊符號同空格",
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
  // No Mandarin sentence final particles
  // 吧唄吶
  regex: /[\u5427\u5504\u5436](\s|\u3002|\u002E|\uFF0C|\u002C|$)/,
  error: '句子唔可以有官話語氣詞（吧唄吶）',
},
{
  // No Mandarin characters
  // 這哪您們唄咱啥甭
  regex: /[\u9019\u54EA\u60A8\u5011\u54B1\u5565\u752D]/,
  error: '句子唔可以有官話詞（這哪您們咱啥甭）',
}];

module.exports = {
  INVALIDATIONS,
};
