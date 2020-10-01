import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getStats } from '../../actions/languages';
import SentenceCollectorInfo from '../sentence-collector-info';
import LanguageInfo from '../language-info';

const Stats = (props) => {
  const {
    languages,
    allLanguages,
    languageStats,
    userUnreviewedStats,
    getStats,
    lastStatsUpdate,
    statsUpdating,
  } = props;

  useEffect(() => {
    getStats(languages, lastStatsUpdate);
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
            userUnreviewedStats={userUnreviewedStats}
          />
        </React.Fragment>
      )}
    </div>
  );
};

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

function mapStateToProps(state) {
  return {
    languageStats: state.languages.stats && state.languages.stats.all,
    userUnreviewedStats: state.languages.stats && state.languages.stats.userUnreviewed,
    allLanguages: state.languages.allLanguages,
    languages: state.languages.languages,
    lastStatsUpdate: state.languages.lastStatsUpdate,
    statsUpdating: state.languages.statsUpdating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStats: (languages, lastStatsUpdate) => dispatch(getStats(languages, lastStatsUpdate)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
