import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import LanguageSelector from '../language-selector';
import ReviewForm from '../review-form';
import WebDB from '../../web-db';

const DEFAULT_STATE = {
  message: '',
  loading: false,
};

export const getReviewUrl = (language) => {
  return `/review/${language || ''}`;
};

export const getLanguageFromMatch = (match) => {
  // Always return an empty string if no lang specified.
  // This ensures we never have an undefined language.
  let lang = match.params.language;
  if (!lang) {
    lang = '';
  }
  return lang;
};

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.onReviewed = this.onReviewed.bind(this);
    this.onSelectLanguage = this.onSelectLanguage.bind(this);
  }

  resetState() {
    this.setState(DEFAULT_STATE);
  }

  componentDidMount() {
    this.fetchSentences();
  }

  componentDidUpdate(prevProps) {
    const oldLang = getLanguageFromMatch(prevProps.match);
    const newLang = this.getLanguageFromParams();
    if (oldLang !== newLang) {
      this.fetchSentences();
    }
  }

  getLanguageFromParams() {
    return getLanguageFromMatch(this.props.match);
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

  userHasNoLanguages() {
    return (
      !this.props.languages || this.props.languages.length < 1
    );
  }

  // Make sure the requests matches the user profile.
  isValidSentenceRequest() {
    if (!this.getLanguageFromParams()) {
      return false;
    }

    if (this.needsRedirectToOnlyLang()) {
      return false;
    }

    if (this.isInvalidLanguageRequest()) {
      return false;
    }

    if (this.userHasNoLanguages()) {
      return false;
    }

    return true;
  }

  async fetchSentences() {
    if (!this.isValidSentenceRequest()) {
      return;
    }

    this.setState({
      loading: true,
    });

    const lang = this.getLanguageFromParams();
    const db = new WebDB(this.props.username, this.props.password);
    const sentences = await db.getSentencesNotVoted(lang);
    this.setState({
      loading: false,
      sentences,
    });
  }

  onSelectLanguage(language) {
    this.resetState();
    this.props.history.push(getReviewUrl(language));
  }

  async onReviewed(reviewedState) {
    const validated = reviewedState.validated;
    const invalidated = reviewedState.invalidated;
    const lang = this.getLanguageFromParams();

    const db = new WebDB(this.props.username, this.props.password);
    const { votes } = await db.vote(lang, validated, invalidated);
    this.setState({
      message: `${votes.length} sentences reviewed. Thank you!`,
      sentences: null,
    });

    this.fetchSentences();
  }

  renderContent() {
    if (this.state.loading) {
      return <p>Loading sentences...</p>;
    } else if (!this.getLanguageFromParams()) {
      return <p>Please select a language to review sentences.</p>;
    } else if (!this.state.sentences || this.state.sentences.length < 1) {
      return (
        <p>
          No sentences to review.&nbsp;
          <Link to={'/add'}>Add more sentences now!</Link>
        </p>
      );
    } else {
      return <ReviewForm message={this.state.message} onReviewed={this.onReviewed}
        sentences={this.state.sentences} />;
    }
  }

  render() {
    // If user only has one language possible, redirect to it.
    if (this.needsRedirectToOnlyLang()) {
      return (
        <Redirect to={getReviewUrl(this.props.languages[0])} />
      );
    }

    // Make sure requested lang in url is in users languages list.
    if (this.isInvalidLanguageRequest()) {
      return (
        <Redirect to={getReviewUrl()} />
      );
    }

    // If user hasn't added any languages, ask them to do so.
    if (this.userHasNoLanguages()) {
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
          <h1>Review Sentences</h1>
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
