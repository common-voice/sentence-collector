export function sortSentences(sentences) {
  return sentences.sort();
}

export function clean(sentences) {
  return sentences.map((sentence) => {
    return sentence
      // no space after opening '(' or '['
      .replace(/\(\s+/g, '(')
      .replace(/\[\s+/g, '[')

      // no space before closing ')' or ']'
      .replace(/\s+\)/g, ')')
      .replace(/\s+\]/g, ']')

      // no space before or after hyphen
      .replace(/\s+-\s+/g, '-')

      // no space before or after single quote
      .replace(/\s+'\s+/g, "'")

      .replace(/^,+\s/g, '') // we do not want commas at the beginning of the sentence
      .replace(/^,+/g, '') // we do not want commas at the beginning of the sentence
      .replace(/,+$/g, '') // we do not want commas at the end of the sentence

      // In fr-FR, those should have a no space before
      .replace(/\s+,/g, ',')
      .replace(/\s+\./g, '.')
      .replace(/\s+…/g, '…')
      .replace(/,(?!\s+)/g, ', ')
      .replace(/\.(?!\s+)/g, '. ')
      .replace(/…(?!\s+)/g, '… ')

      // In fr-FR, those should have a non-breakable space before and after
      .replace(/([^ ]|^):/g, '$1 :') // before ...
      .replace(/([^ ]|^);/g, '$1 ;')
      .replace(/([^ ]|^)\?/g, '$1 ?')
      .replace(/([^ ]|^)!/g, '$1 !')
      .replace(/:(?!\s+)/g, ': ')    // after ...
      .replace(/;(?!\s+)/g, '; ')
      .replace(/\?(?!\s+)/g, '? ')
      .replace(/!(?!\s+)/g, '! ')

      // Final normalization of spaces
      .replace(/\s+/g, ' ')
      .replace(/\s+$/g, '')
    ;
  });
}
