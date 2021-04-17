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
function clean(sentences) {
  return sentences.map((sentence) => {
    return sentence
      .replace(/[\u200b\u200c]/g, '')  // removes zero-width chars (occurs in some Thai texts)
      .replace(/[^\s0-9\u0e01-\u0e2e\u0e30-\u0e39\u0e40-\u0e45\u0e47-\u0e4c\-\.‚;:“”‘’\u0022\u0027\u0060!\u003f]/g, '')  // allowed_symbols_regex
      .replace(/:/g, ' : ') // add a space before and after colon
      .replace(/\?/g, ' ? ') // adds a space before and after question mark
      .replace(/!/g, ' ! ') // adds a space before and after exclamation mark
      .replace(/,/g, ' ') // replaces comma with space
      .replace(/\.(\.\s*)+/g, ' ') // replaces ellipsis (.., ...) with space
      .replace(/\s\./g, ' ') // replaces orphan period with space
      .replace(/(\u0E46\s*)+/g, '\u0E46') // condenses multiple Maiyamok to one Maiyamok
      .replace(/\u0E46/g, ' \u0E46 ') // adds a space before and after Maiyamok
      .replace(/\s+/g, ' ') // condenses multiple spaces to one space
      .replace(/^\.+/, '') // removes periods at the beginning of the sentence
      .replace(/^,+/, '') // removes commas at the beginning of the sentence
      .replace(/,+$/, '') // removes commas at the end of the sentence
      .replace(/^:+/, '') // removes colons at the beginning of the sentence
      .replace(/:+$/, '') // removes colons at the end of the sentence
      .replace(/^;+/, '') // removes semicolons at the beginning of the sentence
      .replace(/;+$/, '') // removes semicolons at the end of the sentence
      .replace(/^\s+/, '') // removes spaces at the beginning of the sentence
      .replace(/\s+$/, '') // removes spaces at the end of the sentence
      .replace(/\u0E40\u0E40/g, '\u0E41') // normalizes Sara E + Sara E -> Sara Ae
      .replace(/\u0E4d([\u0E48\u0E49\u0E4A\u0E4B]*)\u0E32/g, '$1\u0E33') // normalizes Nikhahit + Sara Aa -> Sara Am
      .replace(/([\u0E24\u0E26])\u0E32/g, '$1\u0E45') // normalizes Ru/Lu + Sara Aa -> Ru/Lu + Lakkhangyao
      ;
  });
}
