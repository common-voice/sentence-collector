import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getStats } from '../actions/languages';
import SentenceCollectorInfo from '../components/sentence-collector-info';
import LanguageStats from '../components/language-stats';
import type { RootState } from '../types';

export default function Stats() {
  const dispatch = useDispatch();
  const {
    all: languageStats,
    userUnreviewed,
  } = useSelector((state: RootState) => state.languages.stats);
  const {
    allLanguages,
    languages,
    lastStatsUpdate,
    statsUpdating,
  } = useSelector((state: RootState) => state.languages);

  useEffect(() => {
    dispatch(getStats(languages, lastStatsUpdate));
  }, []);

  return (
    <div>
      <h1>Statistics</h1>
      <p>Last Update: {lastStatsUpdate ? new Date(lastStatsUpdate).toLocaleString() : 'never'}</p>
      { statsUpdating && (<p>Updating...</p>)}

      { lastStatsUpdate && (
        <React.Fragment>
          <SentenceCollectorInfo languageStats={languageStats} />
          <LanguageStats
            languages={languages}
            allLanguages={allLanguages}
            languageStats={languageStats}
            userUnreviewedStats={userUnreviewed}
          />
        </React.Fragment>
      )}
    </div>
  );
}
