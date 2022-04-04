import React from 'react';
import { useLocalization } from '@fluent/react';

import type { Language } from '../types';

import '../../css/language-selector.css';

const ENGLISH_CODE = 'en';

type LanguageSelectorProps = {
  labelText?: string;
  disabled?: boolean;
  selected?: string;
  onChange: (value: string) => void;
  languages: Language[];
  filters?: Language[];
};

const LanguageSelector = (props: LanguageSelectorProps) => (
  <React.Fragment>
    {props.labelText && (
      <label className="language-selector-label" htmlFor="language-selector">
        {props.labelText}
      </label>
    )}
    <select
      onChange={(event) => props.onChange && props.onChange(event.target.value)}
      disabled={props.disabled}
      value={props.selected}
      className="language-selector"
      id="language-selector"
    >
      <Options {...props} />
    </select>
  </React.Fragment>
);

const Options = (props: LanguageSelectorProps) => {
  const { l10n } = useLocalization();
  let languages = props.languages.filter(Boolean);

  // For convenience, move English to the top of the list since
  // for now the website is localized in English only.
  const englishLang = languages.find((lang) => lang.id === ENGLISH_CODE);
  if (englishLang) {
    const englishIndex = languages.indexOf(englishLang);
    languages.splice(englishIndex, 1);
    languages.unshift(englishLang);
  }

  if (props.filters) {
    languages = languages.filter(
      ({ id }) => !props.filters!.find((filterLang) => id === filterLang.id)
    );
  }

  if (languages.length === 1) {
    return <Option key="default" lang={languages[0]} />;
  }

  const options = languages.map((lang) => {
    const translated = l10n.getString(lang.id);
    return { translated, option: <Option key={lang.id} lang={lang} /> };
  });
  options.sort((a, b) => (a.translated < b.translated ? -1 : 1));
  const optionElements = options.map((optionDefinition) => optionDefinition.option);

  return (
    <>
      <NullOption key="null" />
      {optionElements}
    </>
  );
};

type OptionProps = {
  lang: Language;
};

const Option = ({ lang }: OptionProps) => {
  const { l10n } = useLocalization();

  const localizedName = l10n.getString(lang.id);
  return <option value={lang.id}>{`${localizedName} (${lang.id})`}</option>;
};

const NullOption = () => <option value="">--</option>;

export default LanguageSelector;
