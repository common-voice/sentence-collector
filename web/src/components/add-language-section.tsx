import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Localized, useLocalization } from '@fluent/react';

import { addLanguage } from '../actions/languages';
import type { RootState } from '../types';

import LanguageSelector from './language-selector';

export default function AddLanguage() {
  const { allLanguages, languages, pendingLanguages } = useSelector(
    (state: RootState) => state.languages
  );
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const { l10n } = useLocalization();

  const onLanguageSelect = (language: string) => {
    setLanguage(language);
  };

  const onLanguageAdd = async (event: React.MouseEvent) => {
    event.preventDefault();
    setError('');

    try {
      await dispatch(addLanguage(language));
    } catch (error) {
      setError(l10n.getString('sc-add-lang-could-not-add'));
    }

    setLanguage('');
  };

  const l10nLabelText = l10n.getString('sc-add-lang-sec-label');

  return (
    <section>
      {error && <p className="error-message">{error}</p>}

      <LanguageSelector
        selected={language}
        disabled={pendingLanguages}
        languages={allLanguages}
        filters={languages}
        labelText={l10nLabelText}
        onChange={onLanguageSelect}
      />
      <button
        disabled={!!pendingLanguages || !language}
        onClick={onLanguageAdd}
        className="add-language"
      >
      <Localized id="sc-add-lang-sec-button">
        Add Language
      </Localized>
      </button>
    </section>
  );
}
