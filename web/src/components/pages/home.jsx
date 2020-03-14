import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SentenceCollectorInfo from '../sentence-collector-info';
import LanguageInfo from '../language-info';
import { getLanguages } from '../../../../shared/languages';

class Home extends React.Component {
  render() {
    const fullLangs = getLanguages(this.props.languages);
    return (
      <div>
        <h1>
          Welcome { this.props.authed ? 'back ' : '' }
          to the Common Voice Sentence Collector
        </h1>
        <p>
          This is a website where we collect and review sentences
          for <a href="https://voice.mozilla.org/">Common Voice</a>.
        </p>
        <SentenceCollectorInfo />
        { this.props.authed && (
          <LanguageStats languages={fullLangs}
           username={this.props.username} password={this.props.password} />
        )}
      </div>
    );
  }
}

const LanguageStats = (props) => {
  if (!props.languages || props.languages.length < 1) {
    return (
      <p>
        You have no languages. <br />
        Add languages on your <Link to="/profile">Profile</Link>.
      </p>
    );
  }

  return props.languages.map(lang => (
    <LanguageInfo key={lang.code} language={lang.code}
      username={props.username} password={props.password} />
  ));
};

function mapStateToProps(state) {
  return {
    languages: state.languages.languages,
    authed: state.login.authed,
    username: state.login.username,
    password: state.login.password,
  };
}

export default connect(mapStateToProps)(Home);
