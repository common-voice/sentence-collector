import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeLanguage } from '../actions/languages';

export default function PersonalLanguageInfo() {
  const {
    stats: { user: languageStats = {} },
    allLanguages,
    languages,
    pendingLanguages,
  } = useSelector((state) => state.languages);

  const [error, setError] = useState();
  const dispatch = useDispatch();

  const extendedLanguages = languages.map((lang) => {
    const extended = allLanguages.find((extendedLang) => extendedLang.id === lang);
    return extended;
  }).filter(Boolean);

  const onRemove = async (event) => {
    try {
      event.preventDefault();
      setError('');

      const language = event.currentTarget.dataset.lang;
      await dispatch(removeLanguage(language));
    } catch (error) {
      console.error(error);
      setError(`Could not remove language: ${error.message}`);
    }
  };

  return (
    <section>
      { error && ( <p className="error-message">{error}</p> ) }

      { languages && languages.length > 0 ? (
        <section>
          <p>Your languages:</p>
          <ul>
          { extendedLanguages.map((language, i) => (
            <li key={i}>
              { language.nativeName } ({ language.name })
              <button className="remove-lang" data-lang={language.id}
                      onClick={onRemove} disabled={pendingLanguages}>
                remove
              </button>
              <ul>
                <li>{`${(languageStats[language.id] || {}).added || 0} added by you`}</li>
              </ul>
            </li>
          ))}
          </ul>
        </section>
      ) : (
        <p>You have not added any languages yet.</p>
      )}
    </section>
  );
}
