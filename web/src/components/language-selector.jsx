import React from 'react';
import ISO6391 from 'iso-639-1';

const languages = ISO6391.getLanguages(ISO6391.getAllCodes());

const LanguageSelector = () => (
  <select>
    <option value="">--</option>
    { languages.map((lang, index) => (
      <option value={lang.code} key={index}>
        {`${lang.nativeName} (${lang.name})`}
      </option>
    ))}
  </select>
);

export default LanguageSelector
