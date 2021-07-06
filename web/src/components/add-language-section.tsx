import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLanguage } from '../actions/languages';
import type { RootState } from '../types';

import LanguageSelector from './language-selector';

export default function AddLanguage() {
  const {
    allLanguages,
    languages,
    pendingLanguages,
  } = useSelector((state: RootState) => state.languages);
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const onLanguageSelect = (language: string) => { setLanguage(language); };

  const onLanguageAdd = async (event: React.MouseEvent) => {
    event.preventDefault();
    setError('');

    try {
      if (!language) {
        throw new Error('Please select a language');
      }

      await dispatch(addLanguage(language));
    } catch (error) {
      setError(`Could not add language: ${error.message}`);
    }

    setLanguage('');
  };

  return (
    <section>
      { error && ( <p className="error-message">{error}</p> ) }

      <LanguageSelector
        selected={language}
        disabled={pendingLanguages}
        languages={allLanguages}
        filters={languages}
        labelText="Add a language you want to contribute to"
        onChange={onLanguageSelect}
      />
      <button disabled={!!pendingLanguages || !language}
              onClick={onLanguageAdd} className="add-language">Add Language</button>
    </section>
  );
}
