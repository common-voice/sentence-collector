export function sortSentences(sentences) {
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
export function clean(sentences) {
  return sentences.map((sentence) => {
    return sentence
      .replace(/[\u200b\u200c]/g, '')  // removes zero-width chars (occurs in some Thai texts)
      .replace(/,/g, ' ') // replaces comma with space
      .replace(/\s:/g, ' : ') // add a space before and after colon
      .replace(/\?/g, ' ? ') // adds a space before and after question mark
      .replace(/!/g, ' ! ') // adds a space before and after exclamation mark
      .replace(/(\u0E46\s*)+/g, '\u0E46') // condenses multiple Maiyamok to one Maiyamok
      .replace(/\u0E46/g, ' \u0E46 ') // adds a space before and after Maiyamok
      .replace(/\u0E40\u0E40/g, '\u0E41') // normalizes Sara E + Sara E -> Sara Ae
      .replace(/\u0E4d([\u0E48\u0E49\u0E4A\u0E4B]*)\u0E32/g, '$1\u0e33') // normalizes Nikhahit + Sara Aa -> Sara Am
      .replace(/\s+/g, ' ') // condenses multiple spaces to one space
      .replace(/\.(\.\s*)+/g, '') // removes ellipsis (.., ...)
      .replace(/\s\./g, '') // removes orphan period
      .replace(/^\./, '') // removes periods at the beginning of the sentence
      .replace(/^\s+/, '') // removes spaces at the beginning of the sentence
      .replace(/\s+$/, '') // removes spaces at the end of the sentence
      ;
  });
}
