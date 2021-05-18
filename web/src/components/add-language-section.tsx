import React, { useState } from 'react';
import type { Language } from '../types';

import LanguageSelector from './language-selector';

type Props = {
  allLanguages: Language[]
  onAdd?: (language: string) => void
  languages?: string[]
  pendingLanguages?: boolean
}

export default function AddLanguage({ allLanguages, onAdd, languages, pendingLanguages }: Props) {
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');

  const onLanguageSelect = (language) => { setLanguage(language); };

  const onLanguageAdd = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (!language) {
        throw new Error('Please select a language');
      }

      await onAdd(language);
    } catch (error) {
      setError(`Could not add language: ${error.message}`);
    }

    setLanguage('');
  };

  return (
    <section>
      { error && ( <p className="error-message">{error}</p> ) }

      <LanguageSelector disabled={pendingLanguages}
                        name="language-selector"
                        languages={allLanguages}
                        filters={languages}
                        labelText="Add a language you want to contribute to"
                        onChange={onLanguageSelect} />
      <button disabled={!!pendingLanguages || !language}
              onClick={onLanguageAdd} className="add-language">Add Language</button>
    </section>
  );
}
