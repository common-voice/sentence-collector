import React from 'react';
import ISO6391 from 'iso-639-1';

import '../../css/language-selector.css';

const getAllLanguages = () => ISO6391.getLanguages(ISO6391.getAllCodes());

export const getLanguageName = ISO6391.getNativeName.bind(ISO6391);

const LanguageSelector = (props) => (
  <select disabled={props.disabled}
          className='language-selector {props.className}'>
    <Options {...props} />
  </select>
);

const Options = (props) => {
  let languages = props.only && props.only.length > 0 ?
    ISO6391.getLanguages(props.only) : getAllLanguages();

  if (props.filters) {
    languages = languages.filter(({ code }) => props.filters.indexOf(code) === -1);
  }

  if (languages.length === 1) {
    return <Option key="default" lang={languages[0]} />;
  }

  return [<NullOption key="null" />]
    .concat(languages.map(
      lang => <Option key={lang.code} lang={lang} />
    ));
};

const Option = (props) => (
  <option value={props.lang.code}>
    {`${props.lang.nativeName} (${props.lang.name})`}
  </option>
);

const NullOption = () => <option value="">--</option>;


export default LanguageSelector
