import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome { this.props.authed ? ' back' : '' } to the Sentence Collector</h1>
        { !this.props.authed ? (
          <p>
            This is a website where we collect and review sentences
            for <a href="https://voice.mozilla.org/">Common Voice</a>.
          </p>
        ) : (
          <p>It's good to see you, { this.props.username }.</p>
        )}
      </div>
    );
  }
}
