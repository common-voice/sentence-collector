import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Localized, useLocalization } from '@fluent/react';

import { removeLanguage } from '../../actions/languages';
import { RootState } from '../../types';
import Error from '../error';

export default function PersonalLanguageInfo() {
  const { languages, pendingLanguages, fetchFailure } = useSelector(
    (state: RootState) => state.languages
  );
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const { l10n } = useLocalization();

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

  return (
    <section>
      {error && <p className="error-message">{error}</p>}

      {fetchFailure && <Error translationKey="sc-languages-fetch-error" />}

      {languages && languages.length > 0 ? (
        <section>
          <Localized id="sc-personal-your-languages">
            <p></p>
          </Localized>
          <ul>
            {languages.map((language, i) => {
              const languageName = l10n.getString(language.id) || language.id;

              return (
                <li key={i}>
                  {languageName}
                  <button
                    className="remove-lang"
                    onClick={(event) => {
                      event.preventDefault();
                      onLanguageRemove(language.id);
                    }}
                    disabled={pendingLanguages}
                  >
                    <Localized id="sc-personal-remove-button" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <Localized id="sc-personal-not-added">
          <p></p>
        </Localized>
      )}
    </section>
  );
}
