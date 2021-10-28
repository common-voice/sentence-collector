import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Localized, useLocalization } from '@fluent/react';

import { removeLanguage } from '../actions/languages';
import truthyFilter from '../truthyFilter';
import { RootState } from '../types';

export default function PersonalLanguageInfo() {
  const { userStats } = useSelector((state: RootState) => state.login);
  const { allLanguages, languages, pendingLanguages } = useSelector(
    (state: RootState) => state.languages
  );
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  const { l10n } = useLocalization();

  const extendedLanguages = languages
    .map((lang) => {
      const extended = allLanguages.find((extendedLang) => extendedLang.id === lang);
      return extended;
    })
    .filter(truthyFilter);

  const onLanguageRemove = async (language: string) => {
    if (!language) {
      setError(l10n.getString('sc-personal-err-lang-not-found'));
      return;
    }

    try {
      setError('');
      await dispatch(removeLanguage(language));
    } catch (error) {
      setError(l10n.getString('sc-personal-err-remove'));
    }
  };

  let sentencesAddedByYou: number;


  return (
    <section>
      {error && <p className="error-message">{error}</p>}

      {extendedLanguages && extendedLanguages.length > 0 ? (
        <section>
          <Localized id="sc-personal-your-languages">
            <p>Your languages:</p>
          </Localized>
          <ul>
            {extendedLanguages.map((language, i) => (
              <li key={i}>
                {language.nativeName} ({language.name})
                <button
                  className="remove-lang"
                  onClick={(event) => {
                    event.preventDefault();
                    onLanguageRemove(language.id);
                  }}
                  disabled={pendingLanguages}
                >
                  <Localized id="sc-personal-remove-button">
                    remove
                  </Localized>
                </button>
                <ul>
                  <li>
                    {`${(userStats[language.id] || {}).added || 0} `}
                    <Localized id="sc-personal-added-by-you">
                      added by you
                    </Localized>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : (
      <Localized id="sc-personal-not-added">
        <p>You have not added any languages yet.</p>
      </Localized>
      )}
    </section>
  );
}
