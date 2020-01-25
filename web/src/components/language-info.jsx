import React from 'react';
import { Link } from 'react-router-dom';

import WebDB from '../web-db';
import { getLanguageName } from '../../../shared/languages';
import { getReviewUrl } from './pages/review';

const DEFAULT_STATE = {
  loading: false,
  total: -1,
  unvoted: -1,
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
    const count = await db.getSentenceCount(this.props.language);
    const unreviewed = await db.getNotVoted(this.props.language);
    const validated = await db.getFirstPageOfValidatedSentences(this.props.language);
    this.setState({
      total: count,
      unvoted: unreviewed.length,
      validated: validated.length,
    });
  }

  render() {
    return this.state.loading ? <p>Loading language data...</p> : (
      <section>
        <h3>{getLanguageName(this.props.language)}</h3>
        { this.state.loading && ( <p>Loading</p> ) }
        <ul>
          <li>{this.state.total} total sentences.</li>
          <li>
           {this.state.unvoted} unreviewed sentences.&nbsp;
           { this.state.unvoted > 0 && (
             <Link to={getReviewUrl(this.props.language)}>Review now!</Link>
           )}
           { this.state.unvoted === 0 && (
             <Link to={'/add'}>Add more sentences now!</Link>
           )}
          </li>
          <li>{this.state.validated} validated sentences.</li>
        </ul>
      </section>
    );
  }
}
