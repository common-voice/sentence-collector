import React from 'react';
import { Link } from 'react-router-dom';

import WebDB from '../../web-db';
import { getLanguages } from '../../../../shared/languages';

export default class Home extends React.Component {
  render() {
    const fullLangs = getLanguages(this.props.languages);
    return (
      <div>
        <h1>Welcome { this.props.authed ? ' back' : '' } to the Sentence Collector</h1>
        { !this.props.authed ? (
          <p>
            This is a website where we collect and review sentences
            for <a href="https://voice.mozilla.org/">Common Voice</a>.
          </p>
        ) : (
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
    <Stat key={lang.code} name={lang.name} code={lang.code}
      username={props.username} password={props.password} />
  ));
};

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.load();
  }

  async load() {
    const db = new WebDB(this.props.username, this.props.password);
    const count = await db.getSentenceCount(this.props.code);
    const newState = {};
    newState[this.props.code] = count;
    this.setState(newState);
  }

  render() {
    let prevCount = this.state[this.props.code];
    if (typeof prevCount === 'undefined') {
      prevCount = 'loading...';
    }

    return (
      <p key={this.props.code}>
        {this.props.name} => <b>{prevCount}</b>
      </p>
    );
  }
}
