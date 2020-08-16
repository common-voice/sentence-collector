import React from 'react';
import { connect } from 'react-redux';

import { uploadSentences } from '../../actions/sentences';

import SubmitForm from '../submit-form';
import ConfirmForm from '../confirm-form';
import ReviewForm from '../review-form';

import '../../../css/add.css';

const SPLIT_ON = '\n';
const DEFAULT_STATE = {
  message: '',
  error: '',
  submitted: [],
  unreviewed: [],
  reviewing: [],
  validated: [],
  invalidated: [],
};

function merge(arr1, arr2) {
  return arr1.reduce((accum, cur) => {
    return accum.indexOf(cur) === -1 ? accum.concat([cur]) : accum;
  }, arr2);
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;

    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onReview = this.onReview.bind(this);
    this.onReviewed = this.onReviewed.bind(this);
  }

  componentDidMount() {
    if (this.props.history) {
      this.historyUnblock = this.props.history.block(() => {
        if (this.needsConfirmation()) {
          return "Your sentences have not been added. Are you sure you want to leave?";
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.props.history) {
      this.historyUnblock();
    }
  }

  resetState() {
    this.setState(DEFAULT_STATE);
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

  getConfirmInput() {
    const input = document.querySelector('#agree');
    return input && input.checked;
  }

  getReadySentences() {
    return {
      unreviewed: this.state.unreviewed,
      validated: this.state.validated,
    };
  }

  validateForm() {
    let lang = this.getLanguageInput();
    if (!lang) {
      this.resetState();
      this.setState({
        message: 'Please select a language.',
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

    let confirmInput = this.getConfirmInput();
    if (!confirmInput) {
      this.setState({
        message: 'Please confirm that these sentences are public domain.',
      });
      return false;
    }

    return true;
  }

  needsConfirmation() {
    return (this.state.unreviewed.length > 0 ||
           this.state.validated.length > 0 ||
           this.state.invalidated.length > 0);
  }

  parseSentences(text) {
    const sentences = text.split(SPLIT_ON).map(s => s.trim()).filter(Boolean);
    const dedupedSentences = Array.from(new Set(sentences));
    return dedupedSentences;
  }

  onSubmit(evt) {
    evt.preventDefault();
    if (!this.validateForm()) {
      return false;
    }

    this.resetState();
    const sentences = this.parseSentences(this.getSentencesInput());
    this.setState({
      language: this.getLanguageInput(),
      source: this.getSourceInput(),
      submitted: sentences,
      unreviewed: sentences,
    });
  }

  async onConfirm(evt) {
    try {
      evt.preventDefault();

      const sentences = this.getReadySentences();
      const locale = this.state.language;
      const source = this.state.source;
      const { errors, duplicates } = await this.props.uploadSentences({
        locale,
        sentences,
        source,
      });

      if (typeof errors === 'undefined') {
        throw new Error('Unexpected response returned from server');
      }

      this.historyUnblock();
      this.resetState();
      this.setState({
        message: `Submitted sentences. ${duplicates} sentences were rejected as duplicates.`,
        error: errors && errors.length > 0 ? `${errors.length} sentences failed` : '',
      });
    } catch (err) {
      this.resetState();
      this.setState({
        message: `Submission Error: ${err.message}`,
      });
    }
  }

  onReview() {
    this.setState({
      reviewing: this.state.unreviewed.map((sentence) => ({ sentence })),
    });
  }

  onReviewed(reviewedState) {
    this.setState({
      reviewing: [],
      unreviewed: reviewedState.unreviewed.map((info) => info.sentence),
      validated: merge(this.state.validated, reviewedState.validated.map((info) => info.sentence)),
      invalidated: merge(this.state.invalidated, reviewedState.invalidated.map((info) => info.sentence)),
    });
  }

  render() {
    if (this.state.reviewing.length > 0) {
      // The review form allows us to examine, and validate sentences.
      return <ReviewForm onReviewed={this.onReviewed}
                         sentences={this.state.reviewing} />;
    } else if (this.needsConfirmation()) {
      // The confirm form is a stats page where sentence submission happens.
      return <ConfirmForm onSubmit={this.onConfirm}
                          onReview={this.onReview}
                          submitted={this.state.submitted}
                          unreviewed={this.state.unreviewed}
                          validated={this.state.validated}
                          invalidated={this.state.invalidated} />;
    } else {
      // The plain submission form allows copy & pasting
      return <SubmitForm onSubmit={this.onSubmit}
                         message={this.state.message}
                         error={this.state.error} />;
    }
  }
}

function mapStateToProps(state) {
  return {
    languages: state.languages.languages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uploadSentences: (sentencePackage) => dispatch(uploadSentences(sentencePackage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
