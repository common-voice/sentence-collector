import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LanguageSelector from '../language-selector';
import ReviewForm from '../review-form';
import { sendRequest } from '../../backend';
import Modal from '../modal';
import reviewSentences from '../../../../doc/review-sentences.md';

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

class Review extends React.Component {
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
           !this.props.languages.find((lang) => lang === this.getLanguageFromParams());
  }

  userHasNoLanguages() {
    return !this.props.languages || this.props.languages.length < 1;
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
    const sentences = await sendRequest(`sentences/review?locale=${lang}&user=${this.props.username}`);
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
    const validated = reviewedState.validated.map((info) => info.id);
    const invalidated = reviewedState.invalidated.map((info) => info.id);

    const { votes } = await sendRequest('votes', 'PUT', {
      validated,
      invalidated,
      user: this.props.username,
    });

    this.setState({
      message: `${votes} sentences reviewed. Thank you!`,
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
        sentences={this.state.sentences} useSwipeReview={this.props.useSwipeReview} />;
    }
  }

  render() {
    const { languages, allLanguages } = this.props;

    // If user only has one language possible, redirect to it.
    if (this.needsRedirectToOnlyLang()) {
      return (
        <Redirect to={getReviewUrl(languages[0])} />
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

    const extendedLanguages = languages.map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.code === lang));
    return (
      <div>
        <section>
          <h1>Review Sentences</h1>
          <LanguageSelector name="language-selector-review" languages={extendedLanguages}
                            selected={this.getLanguageFromParams()} onChange={this.onSelectLanguage} />
          <Modal text="ⓘ Review Criteria">
            <div dangerouslySetInnerHTML={{ __html: reviewSentences }} />
          </Modal>
        </section>
        { this.renderContent() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allLanguages: state.languages.allLanguages,
    languages: state.languages.languages,
    useSwipeReview: state.settings.useSwipeReview,
    username: state.login.username,
  };
}

export default connect(mapStateToProps)(Review);
