import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SentenceCollectorInfo from '../sentence-collector-info';
import LanguageInfo from '../language-info';

const Home = (props) => {
  const {
    authed,
    languages,
    allLanguages,
    languageStats,
  } = props;

  return (
    <div>
      <h1>Welcome to the Common Voice Sentence Collector</h1>
      <p>
        This is a website where we collect and review sentences
        for <a href="https://voice.mozilla.org/">Common Voice</a>.
      </p>
      <SentenceCollectorInfo languageStats={languageStats} />
      { authed && (
        <LanguageStats
          languages={languages}
          allLanguages={allLanguages}
          languageStats={languageStats}
        />
      )}
    </div>
  );
};

const LanguageStats = ({ languages, allLanguages, languageStats }) => {
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
      total={languageStats[lang.id].added}
      validated={languageStats[lang.id].validated}
      unreviewedByYou={languageStats[lang.id].unreviewedByYou}
    />
  )).filter(Boolean);
};

function mapStateToProps(state) {
  return {
    languageStats: state.languages.stats && state.languages.stats.all,
    allLanguages: state.languages.allLanguages,
    languages: state.languages.languages,
    authed: state.login.authed,
  };
}

export default connect(mapStateToProps)(Home);
