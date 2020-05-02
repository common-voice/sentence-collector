import React from 'react';
import { Link } from 'react-router-dom';

import { getDBInstance } from '../web-db';
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
    } catch (err) {
      console.error('language info load error', err);
    }

    this.setState({
      loading: false,
    });
  }

  async fillCounts() {
    const { language } = this.props;

    const db = getDBInstance();
    const count = await db.getSentenceCount(language);
    const unreviewed = await db.getSentencesNotVoted(language);
    const validated = await db.getValidatedSentences(language);
    this.setState({
      total: count,
      unvoted: unreviewed.length,
      validated: validated.length,
    });
  }

  render() {
    const {
      loading,
      total,
      unvoted,
      validated,
    } = this.state;

    const { language, languageName } = this.props;

    return loading ? <p>Loading language data...</p> : (
      <section>
        <h3>{languageName}</h3>
        { this.state.loading && ( <p>Loading</p> ) }
        <ul>
          <li>{total} total sentences.</li>
          <li>
           {unvoted} unreviewed sentences.&nbsp;
           { unvoted > 0 && (
             <Link to={getReviewUrl(language)}>Review now!</Link>
           )}
           { unvoted === 0 && (
             <Link to={'/add'}>Add more sentences now!</Link>
           )}
          </li>
          <li>{validated} validated sentences.</li>
        </ul>
      </section>
    );
  }
}
