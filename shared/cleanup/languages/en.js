export function sortSentences(sentences) {
  return sentences.sort();
}

export function clean(sentences) {
  return sentences.map((sentence) => {
    return sentence
      .replace('  ', ' ')
      .replace(' :', ':')
      .replace(' ,', ',')
      .replace(' .', '.')
      .replace(' ?', '?')
      .replace(' !', '!')
      .replace(/^,+\s/, '') // we do not want commas at the beginning of the sentence
      .replace(/^,+/, '') // we do not want commas at the beginning of the sentence
      .replace(/,+$/, '') // we do not want commas at the end of the sentence
    ;
  });
}
