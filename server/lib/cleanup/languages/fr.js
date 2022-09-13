module.exports = {
  sortSentences,
  clean,
};

function sortSentences(sentences) {
  return sentences.sort();
}

function clean(sentences) {
  return sentences.map((sentence) => {
    return sentence
	  //caracters and space cleanup
	  
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

      // Normalize three consecutive dots into unicode elipsis
      .replace(/\.{3}/g, '…')

      // In fr-FR, those should have a no space before and a normal space after
      .replace(/\s+,/g, ',') // before ...
      .replace(/\s+\./g, '.')
      .replace(/\s+…/g, '…')
      .replace(/,(?!\s+)/g, ', ') // after ...
      .replace(/\.(?!\s+)/g, '. ')
      .replace(/…(?!\s+)/g, '… ')

      // In fr-FR, those should have a non-breakable space before and a normal space after
      .replace(/([^ ]|^):/g, '$1 :') // before ...
      .replace(/([^ ]|^);/g, '$1 ;')
      .replace(/([^ ]|^)\?/g, '$1 ?')
      .replace(/([^ ]|^)!/g, '$1 !')
      .replace(/:(?!\s+)/g, ': ')    // after ...
      .replace(/;(?!\s+)/g, '; ')
      .replace(/\?(?!\s+)/g, '? ')
      .replace(/!(?!\s+)/g, '! ')

	  //special names and places cleanup  	  
	  //based on common-voice/CorporaCreator#87

	  //Jean-Paul II
	  .replace(/Jean-Paul II|Jean Paul II/g, 'Jean-Paul deux')
	  
	  //abrevation fr-FR cleanup
	  //based on common-voice/CorporaCreator#87
	  .replace(/(^|\s|\w)\/an(\s|\.|,|\?|!|$)/g, '$1 par an ')
	  .replace(/(^|\s)km(\s|\.|,|\?|!|$)/g, ' kilomètres ')
	  .replace(/%, ' pourcent ')
	  .replace(/(^|\s|\w)\+(\s|\.|,|\?|!|$)/g, ' plus ')
	  .replace(/(^|\s|[0-9]+)m(?:2|²)(\s|\.|,|\?|!|$)/g, '$1 mètres carrés ')
	  .replace(/(^|\s|[0-9]+)(\/|\/\s)m(?:2|²)(\s|\.|,|\?|!|$)/g, '$1 par mètres carrés ')
	  .replace(/\s?€/g, ' euros ')
	  .replace(/\s?£/g, ' livres ')
	  .replace(/\s?$/g, ' dollars ')
	  .replace(/(^| )(n|N)(?:°|º|°)(\s)?/g, ' $2uméro ') //numéro or Numéro
	  
	  //acronym fr-FR cleanup
	  //based on common-voice/CorporaCreator#87  
	  .replace(/(^|\s)ANPE(\s|\.|,|\?|!|$)/g, ' Agence Nationale Pour l\'Emploi ') 
      .replace(/(^|\s)APL(\s|\.|,|\?|!|$)/g, ' Aide personnalisée au logement ')
      .replace(/(^|\s)CDI(\s|\.|,|\?|!|$)/g, ' Contrat à Durée Indéterminée ')
      .replace(/(^|\s)CICE(\s|\.|,|\?|!|$)/g, ' Crédit d\'impôt pour la compétitivité et l\'emploi ')
      .replace(/(^|\s)DRH(\s|\.|,|\?|!|$)/g, ' Direction des Ressources Humaines ')
      .replace(/(^|\s)EDF(\s|\.|,|\?|!|$)/g, ' Electricité de France ')
      .replace(/(^|\s)FN(\s|\.|,|\?|!|$)/g, ' F N ')
      .replace(/(^|\s)HLM(\s|\.|,|\?|!|$)/g, ' Habitation à Loyer Modéré ')
      .replace(/(^|\s)IGN(\s|\.|,|\?|!|$)/g, ' Institut Géographique National ')
      .replace(/(^|\s)INPI(\s|\.|,|\?|!|$)/g, ' Institut  National de la Propriété Intellectuelle ')
      .replace(/(^|\s)ISF(\s|\.|,|\?|!|$)/g, ' Impôt sur la fortune ')
      .replace(/(^|\s)IUT(\s|\.|,|\?|!|$)/g, ' Institut Universitaire de Technologie ')
      .replace(/(^|\s)LREM(\s|\.|,|\?|!|$)/g, ' L R E M ')
      .replace(/(^|\s)NUPES(\s|\.|,|\?|!|$)/g, ' Nupes ')
      .replace(/(^|\s)PHP(\s|\.|,|\?|!|$)/g, ' P H P ')
      .replace(/(^|\s)PMA(\s|\.|,|\?|!|$)/g, ' Procréation médicalement assistée ')
      .replace(/(^|\s)PME(\s|\.|,|\?|!|$)/g, ' Petite et Moyenne Entreprise ')
      .replace(/(^|\s)RN(\s|\.|,|\?|!|$)/g, ' R N ')
      .replace(/(^|\s)RSA(\s|\.|,|\?|!|$)/g, ' Revenu de Solidarité Active ')
      .replace(/(^|\s)RSA(\s|\.|,|\?|!|$)/g, ' Revenu de Solidarité Active ')
      .replace(/(^|\s)RSI(\s|\.|,|\?|!|$)/g, ' Régime Social des Indépendants ')
      .replace(/(^|\s)RTE(\s|\.|,|\?|!|$)/g, ' Réseau de Transport d\'Électricité ')
      .replace(/(^|\s)SNCF(\s|\.|,|\?|!|$)/g, ' Société Nationale des Chemins de Fer ')
      .replace(/(^|\s)TGV(\s|\.|,|\?|!|$)/g, ' Train à Grande Vitesse ')
      .replace(/(^|\s)TVA(\s|\.|,|\?|!|$)/g, ' Taxe sur la Valeur Ajoutée ')
      .replace(/(^|\s)UDI(\s|\.|,|\?|!|$)/g, ' U D I ')
      .replace(/(^|\s)UMP(\s|\.|,|\?|!|$)/g, ' U M P ')
      .replace(/(^|\s)USA(\s|\.|,|\?|!|$)/g, ' U S A ')

	  //dates, digits and numbers fr-FR cleanup
	  .replace((^|\s)\d{1,2}\/\d{1,2}\/(\d{2}[^\d]|\d{4})(\s|$), ' ') //date format dd/mm/yy ou dd/mm/yyyy
	  .replace((^|\s)\d{1,2}\/(\d{2}[^\d]|\d{4})(\s|$), ' ') //date format mm/yy ou mm/yyyy
	  .replace(\d, '') //any digit ou number left

	  // Final normalization of spaces
	  .replace(/\s+/g, ' ')
      .replace(/\s+$/g, '')

    ;
  });
}
