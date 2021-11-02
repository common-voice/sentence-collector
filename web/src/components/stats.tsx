import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Localized } from '@fluent/react';

import { getStats } from '../actions/languages';
import truthyFilter from '../truthyFilter';
import type { RootState } from '../types';
import LanguageInfo from './language-info';

export default function Stats() {
  const dispatch = useDispatch();
  const {
    all: languageStats,
    userUnreviewed,
    totals,
  } = useSelector((state: RootState) => state.languages.stats);
  const { allLanguages, languages, lastStatsUpdate, statsUpdating } = useSelector(
    (state: RootState) => state.languages
  );

  useEffect(() => {
    dispatch(getStats(languages, lastStatsUpdate));
  }, []);

  const extendedLanguages = languages
    .map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.id === lang))
    .filter(truthyFilter);

  return (
    <div>
      <Localized id="sc-stats-title">
        <h1></h1>
      </Localized>

      {lastStatsUpdate ? (
        <Localized
          id="sc-stats-last-update"
          vars={{ lastUpdate: new Date(lastStatsUpdate).toLocaleString() }}
        >
          <p></p>
        </Localized>
      ) : (
        <Localized id="sc-stats-last-update-never">
          <p></p>
        </Localized>
      )}

      {statsUpdating && (
        <Localized id="sc-stats-updating">
          <p></p>
        </Localized>
      )}

      {lastStatsUpdate && (
        <React.Fragment>
          {totals && (
            <Localized
              id="sc-stats-summary"
              vars={{
                sentenceCount: totals.total,
                languageCount: totals.languages,
              }}
            >
              <p></p>
            </Localized>
          )}

          {extendedLanguages
            .map(
              (lang) =>
                languageStats &&
                languageStats[lang.id] && (
                  <LanguageInfo
                    key={lang.id}
                    language={lang.id}
                    nativeLanguageName={lang.nativeName}
                    total={languageStats[lang.id].added}
                    validated={languageStats[lang.id].validated}
                    rejected={languageStats[lang.id].rejected}
                    unreviewedByYou={userUnreviewed[lang.id]}
                  />
                )
            )
            .filter(Boolean)}
        </React.Fragment>
      )}
    </div>
  );
}
