import React from 'react';
import { connect } from 'react-redux';

import WebDB from '../../web-db';

class Rejected extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      rejectedSentences: {},
    };
  }

  async loadRejected() {
    if (!this.props.languages || this.props.languages.length < 1) {
      return;
    }

    const db = new WebDB(this.props.username, this.props.password);
    const rejectedSentences = await db.getAllRejectedByUsername(this.props.languages, this.props.username);
    this.setState({
      rejectedSentences,
      loading: false,
    });
  }

  componentDidMount() {
    this.loadRejected();
  }

  render() {
    const { rejectedSentences, loading } = this.state;

    return (
      <>
        <h1>Your rejected sentences</h1>

        { loading && (
          <p>Loading rejected sentences..</p>
        )}

        { !loading && Object.keys(rejectedSentences).length === 0 && (
          <p>No rejected sentences found!</p>
        )}

        { Object.keys(rejectedSentences).map((language) => (
          <section key={'section-' + language}>
            <h2 key={language}>{language}</h2>

            <ul key={'list-' + language} className="no-bullets">
              { rejectedSentences[language].map((sentence) => (
                <li key={sentence}>{sentence}</li>
              ))}
            </ul>
          </section>
        ))}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.login.username,
    password: state.login.password,
    languages: state.languages.languages,
  };
}

export default connect(mapStateToProps)(Rejected);
