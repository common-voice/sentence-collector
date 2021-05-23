import React from 'react';

import type { Language } from '../types';

import '../../css/language-selector.css';

const ENGLISH_CODE = 'en';

type LanguageSelectorProps = {
  labelText: string
  disabled?: boolean
  selected?: string
  onChange: (value: string) => void
  languages: Language[]
  filters?: string[]
}

const LanguageSelector = (props: LanguageSelectorProps) => (
  <React.Fragment>
    <label className="language-selector-label" htmlFor="language-selector">
      {props.labelText}
    </label>
    <select onChange={(event) => props.onChange && props.onChange(event.target.value)}
            disabled={props.disabled} value={props.selected} className='language-selector'
            id="language-selector">
      <Options {...props} />
    </select>
  </React.Fragment>
);

const Options = (props: LanguageSelectorProps) => {
  let languages = props.languages.filter(Boolean);

  // For convenience, move English to the top of the list since
  // for now the website is localized in English only.
  const englishLang = languages.find(lang => lang.id === ENGLISH_CODE);
  if (englishLang) {
    const englishIndex = languages.indexOf(englishLang);
    languages.splice(englishIndex, 1);
    languages.unshift(englishLang);
  }

  if (props.filters) {
    languages = languages.filter(({ id }) => props.filters!.indexOf(id) === -1);
  }

  if (languages.length === 1) {
    return <Option key="default" lang={languages[0]} />;
  }

  return (
    <>
      <NullOption key="null" />
      {languages.map((lang) => (
        <Option key={lang.id} lang={lang} />
      ))}
    </>
  );
};

type OptionProps = {
  lang: Language
}

const Option = (props: OptionProps) => (
  <option value={props.lang.id}>
    {`${props.lang.name} (${props.lang.nativeName})`}
  </option>
);

const NullOption = () => <option value="">--</option>;


export default LanguageSelector;
