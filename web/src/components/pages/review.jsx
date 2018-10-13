import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import LanguageSelector from '../language-selector';
import ReviewForm from '../review-form';

const DEFAULT_STATE = {
  loading: false,
}

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onReviewed = this.onReviewed.bind(this);
    this.onSelectLanguage = this.onSelectLanguage.bind(this);
  }

  getLanguageFromParams() {
    let lang = this.props.match.params.language;
    // Always return an empty string if no lang specified.
    // This ensures we never have type undefined lang.
    if (!lang) {
      lang = '';
    }
    return lang;
  }

  // If user only has one language possible, redirect to it.
  needsRedirectToOnlyLang() {
    return (this.props.languages.length === 1 &&
            this.props.languages[0] !== this.getLanguageFromParams());
  }

  isInvalidLanguageRequest() {
    return this.props.languages && this.getLanguageFromParams() &&
           this.props.languages.indexOf(this.getLanguageFromParams()) === -1;
  }

  async fetchSentences() {
    if (!this.getLanguageFromParams()) {
      console.warn('Cannot fetch sentences, no language found');
      return;
    }

    this.setState({
      loading: true,
    });

    const db = new WebDB(this.props.username, this.props.password);
    const sentences = await db.getSentences(this.getLanguageFromParams());
    this.setState({
      loading: false,
      sentences,
    });
  }

  onSelectLanguage(language) {
    this.setState({
      language
    });
  }

  onReviewed(reviewedState) {
    this.setState({
      reviewing: [],
      unreviewed: reviewedState.unreviewed,
      validated: merge(this.state.validated, reviewedState.validated),
      invalidated: merge(this.state.invalidated, reviewedState.invalidated),
    });
  }

  renderContent() {
    if (this.state.loading) {
      return <p>Loading sentences...</p>;
    } else if (!this.state.sentences || this.state.sentences.length < 1) {
      return <p>No sentences to review</p>;
    } else {
      return <ReviewForm onReviewed={this.onReviewed}
        sentences={this.state.sentences} />;
    }
  }

  render() {
    // If user only has one language possible, redirect to it.
    if (this.needsRedirectToOnlyLang()) {
      return (
        <Redirect to={`/review/${this.props.languages[0]}`} />
      );
    }

    // Make sure requested lang in url is in users languages list.
    if (this.isInvalidLanguageRequest()) {
      return (
        <Redirect to={`/review/`} />
      );
    }

    // If language has changed, redirect to that language.
    if (this.state.language !== this.getLanguageFromParams()) {
      return (
        <Redirect to={`/review/${this.state.language}`} />
      );
    }

    // If user hasn't added any languages, ask them to do so.
    if (!this.props.languages || this.props.languages.length < 1) {
      return (
        <p>
          You have not selected any languages. Please go to your&nbsp;
          <Link to="/profile">Profile</Link> to select languages.
        </p>
      );
    }

    return (
      <div>
        <section>
          <h1>Review sentences</h1>
          <label className="language-selector-label" htmlFor="language-selector-review">
            Language to review
          </label>
          <LanguageSelector name="language-selector-review" only={this.props.languages}
            selected={this.getLanguageFromParams()} onChange={this.onSelectLanguage} />
        </section>
        { this.renderContent() }
      </div>
    );
  }
}
