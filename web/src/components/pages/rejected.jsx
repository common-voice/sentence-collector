import React from 'react';
import { connect } from 'react-redux';
import { sendRequest } from '../../backend';

class Rejected extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      rejectedSentences: {},
    };
  }

  async loadRejected() {
    const {
      username,
    } = this.props;

    const rejectedSentences = await sendRequest(`sentences/rejected?user=${username}`);
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

    console.log(rejectedSentences, loading); // eslint-disable-line no-console

    return (
      <React.Fragment>
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
                <li key={sentence.id}>{sentence.sentence}</li>
              ))}
            </ul>
          </section>
        ))}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.login.username,
  };
}

export default connect(mapStateToProps)(Rejected);
