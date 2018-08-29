import React from 'react';
import ISO6391 from 'iso-639-1';

import '../../css/language-selector.css';

const languages = ISO6391.getLanguages(ISO6391.getAllCodes());

export const getLanguageName = ISO6391.getNativeName.bind(ISO6391);

const LanguageSelector = (props) => (
  <select className='language-selector {props.className}'>
    <option value="">--</option>
    { languages.reduce((accum, lang, index) => {
      if (!props.filters || props.filters.indexOf(lang.code) === -1) {
        return accum.concat(
          <option value={lang.code} key={index}>
            {`${lang.nativeName} (${lang.name})`}
          </option>
        );
      }
      return accum;
    }, []) }
  </select>
);

export default LanguageSelector
