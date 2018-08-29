import React from 'react';
import ISO6391 from 'iso-639-1';

import '../../css/language-selector.css';

const languages = ISO6391.getLanguages(ISO6391.getAllCodes());

export const getLanguageName = ISO6391.getNativeName.bind(ISO6391);

const LanguageSelector = (props) => (
  <select className='language-selector {props.className}'>
    <option value="">--</option>
    { languages.map((lang, index) => (
      <option value={lang.code} key={index}>
        {`${lang.nativeName} (${lang.name})`}
      </option>
    ))}
  </select>
);

export default LanguageSelector
