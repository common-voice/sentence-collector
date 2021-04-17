module.exports = {
  sortSentences,
  clean,
};

function sortSentences(sentences) {
  return sentences.sort();
}

// Guidelines from the Office of the Royal Society
// comma http://www.royin.go.th/?page_id=10392
//   (in bibliography/index use case, removing comma may change the sentence's semantic,
//   but that use case seems irrelevant here and in any case does not affect sound)
// colon http://www.royin.go.th/?page_id=10399
// question mark http://www.royin.go.th/?page_id=10418
// exclamation mark http://www.royin.go.th/?page_id=10433
// Maiyamok http://www.royin.go.th/?page_id=10427
//
// Emoji range from
// https://gist.github.com/Alex-Just/e86110836f3f93fe7932290526529cd1
// https://www.regextester.com/106421
function clean(sentences) {
  return sentences.map((sentence) => {
    return sentence
      .replace(/[\u200b\u200c]/g, '')  // remove zero-width chars (occurs in some Thai texts)
      .replace(/\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]|[\u0001f1e0-\u0001f1ff\u0001f300-\u0001f5ff\u0001f600-\u0001f64f\u0001f680-\u0001f6ff\u0001f700-\u0001f77f\u0001f780-\u0001f7ff\u0001f800-\u0001f8ff\u0001f900-\u0001f9ff\u0001fa00-\u0001fa6f\u0001fa70-\u0001faff\u00002702-\u000027b0\u000024c2-\u0001f251]/g, '')  // remove emoji
      .replace(/:/g, ' : ')  // add a space before and after colon
      .replace(/\?/g, ' ? ')  // add a space before and after question mark
      .replace(/!/g, ' ! ')  // add a space before and after exclamation mark
      .replace(/,/g, ' ')  // replace comma with space
      .replace(/\.(\.\s*)+/g, ' ')  // replace ellipsis (.., ...) with space
      .replace(/\s\./g, ' ')  // replace orphan period with space
      .replace(/(\u0E46\s*)+/g, '\u0E46')  // condense multiple Maiyamok to one Maiyamok
      .replace(/\u0E46/g, ' \u0E46 ')  // add a space before and after Maiyamok
      .replace(/\s+/g, ' ')  // condense multiple spaces to one space
      .replace(/^\.+/, '')  // remove periods at the beginning of the sentence
      .replace(/^,+/, '')  // remove commas at the beginning of the sentence
      .replace(/,+$/, '')  // remove commas at the end of the sentence
      .replace(/^:+/, '')  // remove colons at the beginning of the sentence
      .replace(/:+$/, '')  // remove colons at the end of the sentence
      .replace(/^;+/, '')  // remove semicolons at the beginning of the sentence
      .replace(/;+$/, '')  // remove semicolons at the end of the sentence
      .replace(/^\s+/, '')  // remove spaces at the beginning of the sentence
      .replace(/\s+$/, '')  // remove spaces at the end of the sentence
      .replace(/\u0E40\u0E40/g, '\u0E41')  // normalize Sara E + Sara E -> Sara Ae
      .replace(/\u0E4d([\u0E48\u0E49\u0E4A\u0E4B]*)\u0E32/g, '$1\u0E33')  // normalize Nikhahit + Sara Aa -> Sara Am
      .replace(/([\u0E24\u0E26])\u0E32/g, '$1\u0E45')  // normalize Ru/Lu + Sara Aa -> Ru/Lu + Lakkhangyao
      ;
  });
}
