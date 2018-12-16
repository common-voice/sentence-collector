import React from 'react';

import WebDB from '../web-db';
import { getLanguageName } from '../../../shared/languages';

const DEFAULT_STATE = {
  loading: false,
  languages: -1,
  sentences: -1,
};

export default class LanguageInfo extends React.Component {
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
      console.error('language info load error', err);
      this.setState({
        loading: false,
      });
    }
  }

  async fillCounts() {
    const db = new WebDB(this.props.username, this.props.password);
    const { languages, sentences } = await db.getCVMetadata();
    this.setState({
      languages,
      sentences,
    });
  }

  render() {
    return this.state.loading ? <p>Loading Common Voice stats...</p> : (
      <p>
        Common Voice has <b>{this.state.sentences}</b> sentences
        in <b>{this.state.languages}</b> languages!
      </p>
    );
  }
}
