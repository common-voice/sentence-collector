import React from 'react';

import WebDB from '../web-db';

const DEFAULT_STATE = {
  loading: false,
  languages: -1,
  sentences: -1,
};

export default class SentenceCollectorInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    try {
      this.setState({
        loading: true,
      });
      await this.fillCounts();
      this.setState({
        loading: false,
      });
    } catch(err) {
      console.error('sentence collector load error', err);
      this.setState({
        loading: false,
      });
    }
  }

  async fillCounts() {
    const db = new WebDB(this.props.username, this.props.password);
    const { languages, sentences } = await db.getSiteMetadata();
    this.setState({
      languages,
      sentences,
    });
  }

  render() {
    return this.state.loading ? <p>Loading sentence collector data...</p> : (
      <p>
       The Common Voice Sentence Collector has
       collected <strong>{this.state.sentences}</strong> sentences
       in <strong>{this.state.languages}</strong> languages!
      </p>
    );
  }
}
