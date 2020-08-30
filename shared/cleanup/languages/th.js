export function sortSentences(sentences) {
  return sentences.sort();
}

export function clean(sentences) {
  return sentences.map((sentence) => {
    return sentence
      .replace(/[\u200b\u200c]/g, '')  // removes zero-width chars (occurs in some Thai texts)
      .replace(/\?/g, ' ') // Thai does not use question mark
      .replace(/!/g, ' ') // Thai does not use exclamation mark
      .replace(/,/g, ' ') // Thai does not use comma
      .replace(/(\u0E46\s*)+/g, '\u0E46') // condenses multiple Maiyamok to one Maiyamok
      .replace(/\u0E46/g, ' \u0E46 ') // adds a space before and after Maiyamok
      .replace(/\u0E40\u0E40/g, '\u0E41') // normalize Sara E + Sara E -> Sara Ae
      .replace(/\u0E4d([\u0E48\u0E49\u0E4A\u0E4B]*)\u0E32/g, '$1\u0e33') // normalize Nikhahit + Sara Aa -> Sara Am
      .replace(/\s+/g, ' ') // condenses multiple spaces to one space
      .replace(/\.(\.\s*)+/g, '') // Thai does not use ellipsis (.., ...)
      .replace(/\s\./g, '') // removes dangling period
      .replace(/\s:/g, ':')
      .replace(/^\./, '') // we do not want periods at the beginning of the sentence
      .replace(/^\s+/, '') // we do not want spaces at the beginning of the sentence
      .replace(/\s+$/, '') // we do not want spaces at the end of the sentence
      ;
  });
}
