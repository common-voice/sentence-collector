import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SentenceCollectorInfo from '../sentence-collector-info';
import LanguageInfo from '../language-info';

const Home = (props) => {
  const { authed, languages, allLanguages } = props;

  return (
    <div>
      <h1>Welcome to the Common Voice Sentence Collector</h1>
      <p>
        This is a website where we collect and review sentences
        for <a href="https://voice.mozilla.org/">Common Voice</a>.
      </p>
      <SentenceCollectorInfo />
      { authed && (
        <LanguageStats languages={languages} allLanguages={allLanguages} />
      )}
    </div>
  );
};

const LanguageStats = ({ languages, allLanguages }) => {
  if (!languages || languages.length < 1) {
    return (
      <p>
        You have no languages. <br />
        Add languages on your <Link to="/profile">Profile</Link>.
      </p>
    );
  }

  const extendedLanguages = languages.map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.code === lang)).filter(Boolean);

  return extendedLanguages.map((lang) => (
    <LanguageInfo key={lang.code} language={lang.code} languageName={lang.name} />
  ));
};

function mapStateToProps(state) {
  return {
    allLanguages: state.languages.allLanguages,
    languages: state.languages.languages,
    authed: state.login.authed,
  };
}

export default connect(mapStateToProps)(Home);
