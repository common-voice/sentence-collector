import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getStats } from '../../actions/languages';
import SentenceCollectorInfo from '../sentence-collector-info';
import LanguageInfo from '../language-info';

export default function Stats() {
  const dispatch = useDispatch();
  const {
    all: languageStats,
    userUnreviewed,
  } = useSelector((state) => state.languages.stats);
  const {
    allLanguages,
    languages,
    lastStatsUpdate,
    statsUpdating,
  } = useSelector((state) => state.languages);

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

const LanguageStats = ({ languages, allLanguages, languageStats, userUnreviewedStats }) => {
  if (!languages || languages.length < 1) {
    return (
      <p>
        You have no languages. <br />
        Add languages on your <Link to="/profile">Profile</Link>.
      </p>
    );
  }

  const extendedLanguages = languages.map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.id === lang)).filter(Boolean);

  return extendedLanguages.map((lang) => languageStats && languageStats[lang.id] && (
    <LanguageInfo
      key={lang.id}
      language={lang.id}
      languageName={lang.name}
      nativeLanguageName={lang.nativeName}
      total={languageStats[lang.id].added}
      validated={languageStats[lang.id].validated}
      rejected={languageStats[lang.id].rejected}
      unreviewedByYou={userUnreviewedStats[lang.id]}
    />
  )).filter(Boolean);
};
