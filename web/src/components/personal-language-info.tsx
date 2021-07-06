import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeLanguage } from '../actions/languages';
import truthyFilter from '../truthyFilter';
import { RootState } from '../types';

export default function PersonalLanguageInfo() {
  const { userStats } = useSelector((state: RootState) => state.login);
  const {
    allLanguages,
    languages,
    pendingLanguages,
  } = useSelector((state: RootState) => state.languages);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  const extendedLanguages = languages.map((lang) => {
    const extended = allLanguages.find((extendedLang) => extendedLang.id === lang);
    return extended;
  }).filter(truthyFilter);

  const onLanguageRemove = async (language: string) => {
    if (!language) {
      setError('Could not remove language: language not found');
      return;
    }

    try {
      setError('');
      await dispatch(removeLanguage(language));
    } catch (error) {
      setError(`Could not remove language: ${error.message}`);
    }
  };

  return (
    <section>
      { error && ( <p className="error-message">{error}</p> ) }

      { extendedLanguages && extendedLanguages.length > 0 ? (
        <section>
          <p>Your languages:</p>
          <ul>
          { extendedLanguages.map((language, i) => (
            <li key={i}>
              { language.nativeName } ({ language.name })
              <button className="remove-lang"
                      onClick={(event) => { event.preventDefault(); onLanguageRemove(language.id); }}
                      disabled={pendingLanguages}>
                remove
              </button>
              <ul>
                <li>{`${(userStats[language.id] || {}).added || 0} added by you`}</li>
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
