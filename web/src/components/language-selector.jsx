import React from 'react';

import '../../css/language-selector.css';
import { getLanguages, getAllLanguages } from '../../../shared/languages';

const LanguageSelector = (props) => (
  <select disabled={props.disabled}
          className='language-selector'>
    <Options {...props} />
  </select>
);

const Options = (props) => {
  let languages = props.only && props.only.length > 0 ?
    getLanguages(props.only) : getAllLanguages();

  if (props.filters) {
    languages = languages.filter(
      ({ code }) => props.filters.indexOf(code) === -1);
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
