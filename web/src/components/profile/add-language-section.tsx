import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Localized, useLocalization } from '@fluent/react';

import { addLanguage } from '../../actions/languages';
import type { RootState } from '../../types';

import Error from '../error';
import LanguageSelector from '../language-selector';

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

  return (
    <section>
      {error && <Error>{error}</Error>}

      <LanguageSelector
        selected={language}
        disabled={pendingLanguages}
        languages={allLanguages}
        filters={languages}
        labelText={l10n.getString('sc-add-lang-sec-label')}
        onChange={onLanguageSelect}
      />
      <button
        disabled={!!pendingLanguages || !language}
        onClick={onLanguageAdd}
        className="add-language"
      >
        <Localized id="sc-add-lang-sec-button" />
      </button>
      <Localized
        id="sc-add-lang-process-notice"
        elems={{
          languageProcessLink: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discourse.mozilla.org/t/readme-how-to-see-my-language-on-common-voice/31530"
            />
          ),
        }}
      >
        <p></p>
      </Localized>
    </section>
  );
}
