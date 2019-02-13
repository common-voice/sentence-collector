export function sortSentences(sentences) {
  return sentences.sort();
}

export function cleanSpaces(sentences) {
  return sentences.map((sentence) => {
    return sentence
      .replace('  ', ' ')
      .replace(' :', ':')
      .replace(' ,', ',')
      .replace(' .', '.')
    ;
  });
}