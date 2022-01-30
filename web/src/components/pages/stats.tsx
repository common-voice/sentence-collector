import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Localized } from '@fluent/react';

import { sendRequest } from '../../backend';
import type { LanguageStats, RootState } from '../../types';
import LanguageInfo from '../language-info';
import LanguageSelector from '../language-selector';

export default function Stats() {
  const [stats, setStats] = useState<LanguageStats>({
    userUnreviewed: {},
    userAdded: {},
    totals: {
      total: 0,
      languages: 0,
    },
    all: {},
  });
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>();
  const { languages, pendingLanguages } = useSelector((state: RootState) => state.languages);

  const isLoading = loading || pendingLanguages;

  // If user only has one language possible, use it.
  if (languages.length === 1 && languages[0].id !== language) {
    setLanguage(languages[0].id);
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const stats = await sendRequest<LanguageStats>(`stats?locales=${language}`);
        setStats(stats);
      } catch (error) {
        console.error('Failed to fetch stats', error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    if (language && !isLoading) {
      fetch();
    }
  }, [language]);

  const onSelectLanguage = (language: string) => {
    setLanguage(language);
  };

  return (
    <div>
      <Localized id="sc-stats-title">
        <h1></h1>
      </Localized>

      <div className="row">
        <LanguageSelector
          labelText=""
          languages={languages}
          selected={language}
          onChange={onSelectLanguage}
        />
      </div>

      {isLoading && (
        <Localized id="sc-stats-updating">
          <p></p>
        </Localized>
      )}

      {!isLoading && hasError && (
        <Localized id="sc-stats-error">
          <p></p>
        </Localized>
      )}

      {!isLoading && !hasError && (
        <React.Fragment>
          {Boolean(stats.totals.languages) && (
            <Localized
              id="sc-stats-summary"
              vars={{
                sentenceCount: stats.totals.total,
                languageCount: stats.totals.languages,
              }}
            >
              <p></p>
            </Localized>
          )}

          {languages
            .map(
              (lang) =>
                stats.all &&
                stats.all[lang.id] && (
                  <LanguageInfo
                    key={lang.id}
                    language={lang.id}
                    total={stats.all[lang.id].added}
                    validated={stats.all[lang.id].validated}
                    rejected={stats.all[lang.id].rejected}
                    unreviewedByYou={stats.userUnreviewed[lang.id]}
                    addedByYou={stats.userAdded[lang.id]}
                  />
                )
            )
            .filter(Boolean)}
        </React.Fragment>
      )}
    </div>
  );
}
