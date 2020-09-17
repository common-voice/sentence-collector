import React from 'react';
import { sendRequest } from '../../backend';

class Rejected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      rejectedSentences: {},
    };
  }

  async loadRejected() {
    const rejectedSentences = await sendRequest(`sentences/rejected`);
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

export default Rejected;
