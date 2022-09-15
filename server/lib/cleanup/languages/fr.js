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

      // normalize – (long hyphen) into  - (short hyphen)
      .replace(/–/g, '-')
      // no space before or after hyphen
      .replace(/\s+-\s+/g, '-')

      // no space before or after single quote
      .replace(/\s+'\s+/g, "'")

      .replace(/^,+\s/g, '') // we do not want commas at the beginning of the sentence
      .replace(/^,+/g, '') // we do not want commas at the beginning of the sentence
      .replace(/,+$/g, '') // we do not want commas at the end of the sentence

      // Normalize three consecutive dots into unicode elipsis
      .replace(/\.{3}/g, '…')

      // Normalize ´ (french apostroph) into ' (usual apostroph)
      .replace(/\´/g, '\'')
      
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

      //abrevation fr-FR cleanup
      //based on common-voice/CorporaCreator#87
      .replace(/(^|\s|\w)\/an(\s|\.|,|\?|!|$)/g, '$1 par an ')
      .replace(/(^|\s)km(\s|\.|,|\?|!|$)/g, ' kilomètres ')
      .replace(/%/, ' pourcent ')
      .replace(/(^|\s|\w)\+(\s|\.|,|\?|!|$)/g, ' plus ')
      .replace(/(^|\s|[0-9]+)m(?:2|²)(\s|\.|,|\?|!|$)/g, '$1 mètres carrés ')
      .replace(/(^|\s|[0-9]+)(\/|\/\s)m(?:2|²)(\s|\.|,|\?|!|$)/g, '$1 par mètres carrés ')
      .replace(/\s?€/g, ' euros ')
      .replace(/\s?£/g, ' livres ')
      .replace(/\s?$/g, ' dollars ')
      .replace(/(^| )(n|N)(?:°|º|°)(\s)?/g, ' $2uméro ') //n° or N° => 'numéro' or 'Numéro'
      

       //roman numerals + century
      .replace(/(^|\s)Ie(r)? s.(\s|\.|,|\?|!|$)/g, ' premier siècle ')
      .replace(/(^|\s)II(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' deuxième siècle ')
      .replace(/(^|\s)III(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' troisième siècle ')
      .replace(/(^|\s)IV(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' quatrième siècle ')
      .replace(/(^|\s)V(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' cinquième siècle ')
      .replace(/(^|\s)VI(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' sixième siècle ')
      .replace(/(^|\s)VII(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' septième siècle ')
      .replace(/(^|\s)VIII(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' huitième siècle ')
      .replace(/(^|\s)(VIIII|IX)(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' neuvième siècle ')
      .replace(/(^|\s)X(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' dixième siècle ')
      .replace(/(^|\s)XI(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' onzième siècle ')
      .replace(/(^|\s)XII(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' douxième siècle ')
      .replace(/(^|\s)XIII(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' treizième siècle ')
      .replace(/(^|\s)(XIIII|XIV)(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' quatorzième siècle ')
      .replace(/(^|\s)XV(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' quinzième siècle ')
      .replace(/(^|\s)XVI(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' seixième siècle ')
      .replace(/(^|\s)XVII(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' dix-septième siècle ')
      .replace(/(^|\s)XVIII(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' dix-huitième siècle ')
      .replace(/(^|\s)(XIX|XVIIII)(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' dix_neuvième siècle ')
      .replace(/(^|\s)XX(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' vingtième siècle ')
      .replace(/(^|\s)XXI(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' vingt-et-unième siècle ')
      .replace(/(^|\s)XXII(e|è)(me)? s.(\s|\.|,|\?|!|$)/g, ' vingt-deuxième siècle ')
      
     //roman numerals.
      .replace(/(^|\s)I(\s|\.|,|\?|!|$)/g, ' premier ') //translated as 'first'. We considere that it's encountered after chapter (Chapitre I => 'chapitre premier'). Work also with names (Charles I => 'Charles premier')
      .replace(/(^|\s)II(\s|\.|,|\?|!|$)/g, ' deux ')
      .replace(/(^|\s)III(\s|\.|,|\?|!|$)/g, ' trois ')
      .replace(/(^|\s)IV(\s|\.|,|\?|!|$)/g, ' quatre ')
      .replace(/(^|\s)V(\s|\.|,|\?|!|$)/g, ' cinq ')
      .replace(/(^|\s)VI(\s|\.|,|\?|!|$)/g, ' six ')
      .replace(/(^|\s)VII(\s|\.|,|\?|!|$)/g, ' sept ')
      .replace(/(^|\s)VIII(\s|\.|,|\?|!|$)/g, ' huit ')
      .replace(/(^|\s)(VIIII|IX)(\s|\.|,|\?|!|$)/g, ' neuf ')
      .replace(/(^|\s)X(\s|\.|,|\?|!|$)/g, ' dix ')
      .replace(/(^|\s)XI(\s|\.|,|\?|!|$)/g, ' onze ')
      .replace(/(^|\s)XII(\s|\.|,|\?|!|$)/g, ' douze ')
      .replace(/(^|\s)XIII(\s|\.|,|\?|!|$)/g, ' treize ')
      .replace(/(^|\s)(XIIII|XIV)(\s|\.|,|\?|!|$)/g, ' quatorze ')
      .replace(/(^|\s)XV(\s|\.|,|\?|!|$)/g, ' quinze ')
      .replace(/(^|\s)XVI(\s|\.|,|\?|!|$)/g, ' seize ')
      .replace(/(^|\s)XVII(\s|\.|,|\?|!|$)/g, ' dix-sept ')
      .replace(/(^|\s)XVIII(\s|\.|,|\?|!|$)/g, ' dix-huit ')
      .replace(/(^|\s)(XIX|XVIIII)(\s|\.|,|\?|!|$)/g, ' dix-neuf ')
      .replace(/(^|\s)XX(\s|\.|,|\?|!|$)/g, ' vingt ')
      .replace(/(^|\s)XXI(\s|\.|,|\?|!|$)/g, ' vingt-et-un ')
      .replace(/(^|\s)XXII(\s|\.|,|\?|!|$)/g, ' vingt-deux ')
      
      //first, second, etc.
      .replace(/(^|\s)1er?s?(\s|\.|,|\?|!|$)/g, ' premier ')
      .replace(/(^|\s)1(e|è)res?(\s|\.|,|\?|!|$)/g, ' premier ')
      .replace(/(^|\s)2(e|è)?me?s?(\s|\.|,|\?|!|$)/g, ' deuxième ')
      .replace(/(^|\s)2n?ds?(\s|\.|,|\?|!|$)/g, ' second ')
      .replace(/(^|\s)2n?des?(\s|\.|,|\?|!|$)/g, ' seconde ')
      .replace(/(^|\s)3i?(e|è)me?s?(\s|\.|,|\?|!|$)/g, ' troisième ')
      .replace(/(^|\s)4i?(e|è)me?s?(\s|\.|,|\?|!|$)/g, ' quatrième ')
      .replace(/(^|\s)5i?(e|è)me?s?(\s|\.|,|\?|!|$)/g, ' cinquième ')
      .replace(/(^|\s)6i?(e|è)me?s?(\s|\.|,|\?|!|$)/g, ' sixième ')
      .replace(/(^|\s)7i?(e|è)me?s?(\s|\.|,|\?|!|$)/g, ' septième ')
      .replace(/(^|\s)8i?(e|è)me?s?(\s|\.|,|\?|!|$)/g, ' huitième ')
      .replace(/(^|\s)9i?(e|è)me?s?(\s|\.|,|\?|!|$)/g, ' neuvième ')
      .replace(/(^|\s)10i?(e|è)me?s?(\s|\.|,|\?|!|$)/g, ' dixième ')
      

      //acronym fr-FR cleanup
      //based on common-voice/CorporaCreator#87  
      .replace(/(^|\s)ANPE(\s|\.|,|\?|!|$)/g, ' Agence Nationale Pour l\'Emploi $3 ') 
      .replace(/(^|\s)APL(\s|\.|,|\?|!|$)/g, ' Aide personnalisée au logement $3 ')
      .replace(/(^|\s)CDI(\s|\.|,|\?|!|$)/g, ' Contrat à Durée Indéterminée $3 ')
      .replace(/(^|\s)CICE(\s|\.|,|\?|!|$)/g, ' Crédit d\'impôt pour la compétitivité et l\'emploi $3 ')
      .replace(/(^|\s)DRH(\s|\.|,|\?|!|$)/g, ' Direction des Ressources Humaines $3 ')
      .replace(/(^|\s)EDF(\s|\.|,|\?|!|$)/g, ' Electricité de France $3 ')
      .replace(/(^|\s)FN(\s|\.|,|\?|!|$)/g, ' Front National $3 ')
      .replace(/(^|\s)HLM(\s|\.|,|\?|!|$)/g, ' Habitation à Loyer Modéré $3 ')
      .replace(/(^|\s)IGN(\s|\.|,|\?|!|$)/g, ' Institut Géographique National $3 ')
      .replace(/(^|\s)INPI(\s|\.|,|\?|!|$)/g, ' Institut  National de la Propriété Intellectuelle $3 ')
      .replace(/(^|\s)ISF(\s|\.|,|\?|!|$)/g, ' Impôt sur la fortune $3 ')
      .replace(/(^|\s)IUT(\s|\.|,|\?|!|$)/g, ' Institut Universitaire de Technologie $3 ')
      .replace(/(^|\s)LREM(\s|\.|,|\?|!|$)/g, ' La Réplublique En Marche $3 ')
      .replace(/(^|\s)NUPES(\s|\.|,|\?|!|$)/g, ' Nupès $3 ')
      .replace(/(^|\s)PHP(\s|\.|,|\?|!|$)/g, ' Protocole Hypertexte Protocolaire $3 ')
      .replace(/(^|\s)PMA(\s|\.|,|\?|!|$)/g, ' Procréation médicalement assistée $3 ')
      .replace(/(^|\s)PME(\s|\.|,|\?|!|$)/g, ' Petite et Moyenne Entreprise $3 ')
      .replace(/(^|\s)RN(\s|\.|,|\?|!|$)/g, ' Rassemblement National $3 ')
      .replace(/(^|\s)RSA(\s|\.|,|\?|!|$)/g, ' Revenu de Solidarité Active $3 ')
      .replace(/(^|\s)RSA(\s|\.|,|\?|!|$)/g, ' Revenu de Solidarité Active $3 ')
      .replace(/(^|\s)RSI(\s|\.|,|\?|!|$)/g, ' Régime Social des Indépendants $3 ')
      .replace(/(^|\s)RTE(\s|\.|,|\?|!|$)/g, ' Réseau de Transport d\'Électricité $3 ')
      .replace(/(^|\s)SNCF(\s|\.|,|\?|!|$)/g, ' Société Nationale des Chemins de Fer $3 ')
      .replace(/(^|\s)TGV(\s|\.|,|\?|!|$)/g, ' Train à Grande Vitesse $3 ')
      .replace(/(^|\s)TVA(\s|\.|,|\?|!|$)/g, ' Taxe sur la Valeur Ajoutée $3 ')
      .replace(/(^|\s)UDI(\s|\.|,|\?|!|$)/g, ' Union des Démocrates Indépendants $3 ')
      .replace(/(^|\s)UMP(\s|\.|,|\?|!|$)/g, ' Union pour un Mouvement Populaire $3 ')
      .replace(/(^|\s)USA(\s|\.|,|\?|!|$)/g, ' Etats Unis d\'Amérique $3 ')

      //replace fraction 1/2 => '1 sur 2'
     ¨.replace(/(^| )(\d+)(\s)?(\/)(\s)?(\d+)(\s|\.|,|\?|!|$)/g, '$2 sur $6')

      //dates, digits and numbers fr-FR cleanup
      //todo : CONVERT TO TEXT instead of removing it
      .replace((^|\s)\d{1,2}\/\d{1,2}\/(\d{2}[^\d]|\d{4})(\s|$), ' ') //date format dd/mm/yy ou dd/mm/yyyy
      .replace((^|\s)\d{1,2}\/(\d{2}[^\d]|\d{4})(\s|$), ' ') //date format mm/yy ou mm/yyyy
      .replace(\d, '') //any digit ou number left

      // Final normalization of spaces
      .replace(/\s+/g, ' ')
      .replace(/\s+$/g, '')

    ;
  });
}
