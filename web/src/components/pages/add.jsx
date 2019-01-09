import React from 'react';

import SubmitForm from '../submit-form';
import ConfirmForm from '../confirm-form';
import ReviewForm from '../review-form';

import '../../../css/add.css';

const DEFAULT_STATE = {
  message: '',
  error: '',
  submitted: [],
  unreviewed: [],
  reviewing: [],
  validated: [],
  invalidated: [],
  filtered: [],
  existing: [],
};

function merge(arr1, arr2) {
  return arr1.reduce((accum, cur) => {
    return accum.indexOf(cur) === -1 ? accum.concat([cur]) : accum;
  }, arr2);
}

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onReview = this.onReview.bind(this);
    this.onReviewed = this.onReviewed.bind(this);
  }

  resetState() {
    this.setState(DEFAULT_STATE);
  }

  resetFullState() {
    this.resetState();
    this.props.resetFullState();
  }

  getLanguageInput() {
    const input = document.querySelector('#add-form select');
    return input && input.value;
  }

  getSentencesInput() {
    const input = document.querySelector('#sentences-input');
    return input && input.value;
  }

  getSourceInput() {
    const input = document.querySelector('#source-input');
    return input && input.value;
  }

  getReadySentences() {
    return {
      unreviewed: this.state.unreviewed,
      validated: this.state.validated,
      count: this.state.unreviewed.length + this.state.validated.length,
    };
  }

  validateForm() {
    let lang = this.getLanguageInput();
    if (!lang) {
      this.resetState();
      this.setState({
        message: 'Please select a langauge.',
      });
      return false;
    }

    let rawInput = this.getSentencesInput();
    if (!rawInput) {
      this.setState({
        message: 'Please add sentences.',
      });
      return false;
    }

    let rawSourceInput = this.getSourceInput();
    if (!rawSourceInput) {
      this.setState({
        message: 'Please add a source.',
      });
      return false;
    }

    return true;
  }

  async startParsingSentences(language, text, source) {
    const { valid, filtered, existing, sentences } = await this.props.parseSentences(language, text);

    this.setState({
      language,
      source,
      existing,
      submitted: sentences,
      unreviewed: valid,
      filtered,
    });
  }

  onSubmit(evt) {
    evt.preventDefault();

    if (!this.validateForm()) {
      return false;
    }

    this.resetState();
    this.startParsingSentences(this.getLanguageInput(), this.getSentencesInput(), this.getSourceInput());
  }

  async onConfirm(evt) {
    try {
      evt.preventDefault();
      const readySentences = this.getReadySentences();
      const language = this.state.language;
      const source = this.state.source;
      const { sentences, errors } =
        await this.props.submitSentences(language, readySentences, source);

      let message = sentences.length > 0 ?
          `Submitted ${sentences.length} sentences.` : '';
      let error = errors.length > 0 ?
          `${errors.length} sentences failed` : '';

      this.resetState();
      this.setState({
        message,
        error,
      });
    } catch (err) {
      this.resetState();
      this.setState({
        message: 'Submission error: ' + err,
      });
    }
  }

  onCancel(evt) {
    evt.preventDefault();
    this.resetFullState();
  }

  onReview() {
    this.setState({
      reviewing: this.state.unreviewed,
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

  render() {
    if (this.state.reviewing.length > 0) {
      // The review form allows us to examine, and validate sentences.
      return <ReviewForm onReviewed={this.onReviewed}
                         sentences={this.state.reviewing} />;

    } else if (this.state.unreviewed.length > 0 ||
               this.state.validated.length > 0 ||
               this.state.invalidated.length > 0 ||
               this.state.filtered.length > 0) {

      // The confirm form is a stats page where sentence submission happens.
      return <ConfirmForm onSubmit={this.onConfirm}
                          onReview={this.onReview}
                          onCancel={this.onCancel}
                          submitted={this.state.submitted}
                          unreviewed={this.state.unreviewed}
                          validated={this.state.validated}
                          invalidated={this.state.invalidated}
                          filtered={this.state.filtered}
                          existing={this.state.existing}
                          readyCount={this.getReadySentences().count} />;

    } else {
      // The plain submission form allows copy & pasting
      return <SubmitForm onSubmit={this.onSubmit}
                         message={this.state.message}
                         error={this.state.error}
                         languages={this.props.languages} />;
    }
  }
}
