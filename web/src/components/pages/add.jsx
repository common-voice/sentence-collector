import React from 'react';
import {
  PunktTrainer,
  PunktSentenceTokenizer
} from 'talisman/tokenizers/sentences/punkt';

import WebDB from '../../web-db';
import LanguageSelector from '../language-selector';
import ReviewForm from '../review-form';
import '../../../css/add.css';

import * as validation from '../../validation';

const SENTENCE_STATE_SUBMITTED = 'submitted';
const SENTENCE_STATE_FILTERED = 'filtered';

const REGEX_BOUNDARY_PIPE = /([.?!])\s*[\n\|]/g;
const REGEX_ALL_PIPE = /[\n\|]/g;

// Use a collection of English text from common voice to train punkt.
import TRAINING_TEXT from '../../../all_en.txt';

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
    this.trainer = new PunktTrainer();
    this.trainer.INCLUDE_ALL_COLLOCS = true;

    this.trainer.train(TRAINING_TEXT);
    this.tokenizer = new PunktSentenceTokenizer(this.trainer.getParams());

    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onReview = this.onReview.bind(this);
    this.onReviewed = this.onReviewed.bind(this);
  }

  async filterSentences(language, sentences) {
    const existingSentences = await this.getAlreadyDefinedSentences(language, sentences);

    const { valid, filtered } = validation.validateSentences(language, sentences);

    const validNonExisting = valid.filter(sentence => {
      const alreadyExisting = existingSentences.indexOf(sentence) !== -1;
      if (alreadyExisting) {
        return false;
      }

      return true;
    });

    return {
      existing: existingSentences,
      valid: validNonExisting,
      filtered,
    };
  }

  async getAlreadyDefinedSentences(language, sentences) {
    const db = new WebDB(this.props.username, this.props.password);
    const existing = await db.validateSentences(language, sentences);
    const existingSentences = existing.map(s => s.sentence);
    return existingSentences;
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

  getReadySentences() {
    return [...this.state.unreviewed, ...this.state.validated];
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

  getPunktSentences(text) {
    // This next section is for dealing with the | (pipe) character from:
    // https://docs.google.com/spreadsheets/d/15HK8boTLejnOK5UuOkNQ3OLphEL8H4rOy_QtOBQbcks/
    //
    // First replace the pipe on sentences that have ending punctuation already.
    let updatedText = text.replace(REGEX_BOUNDARY_PIPE, '$1 ');
    // Then add a period to any sentences that don't have ending punctuation.
    updatedText = updatedText.replace(REGEX_ALL_PIPE, '. ');
    const punktSentences = this.tokenizer.tokenize(updatedText);
    return punktSentences;
  }

  async parseSentences(language, text, source) {
    const punktSentences = this.getPunktSentences(text);

    const trimmed = punktSentences.map(s => s.trim());
    const { valid, filtered, existing } = await this.filterSentences(language, trimmed);

    this.checkForNewSentences([
      ...valid,
      ...filtered,
    ]);

    this.setState({
      language,
      source,
      existing,
      submitted: trimmed,
      unreviewed: valid,
      filtered,
    });
  }

  checkForNewSentences(sentences) {
    if (!sentences.length) {
      this.setState({
        error: 'The sentences you submitted already exist.',
      });
    }
  }

  onSubmit(evt) {
    evt.preventDefault();

    if (!this.validateForm()) {
      return false;
    }

    this.resetState();
    this.parseSentences(this.getLanguageInput(), this.getSentencesInput(), this.getSourceInput());
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
          `Submited ${sentences.length} sentences.` : ''
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
    this.resetState();
  }

  onReview(type) {
    const sentences = type === SENTENCE_STATE_SUBMITTED ?
                      this.state.unreviewed : this.state.filtered;
    this.setState({
      reviewing: sentences,
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
                          ready={this.getReadySentences()} />;

    } else {
      // The plain submission form allows copy & pasting
      return <SubmitForm onSubmit={this.onSubmit}
                         message={this.state.message}
                         error={this.state.error}
                         languages={this.props.languages} />;
    }
  }
}

const ReviewLink = (props) => {
  return props.sentences.length > 0 && (
    <a href="#" onClick={evt => {
      evt.preventDefault();
      props.onReview && props.onReview(props.type);
    }}>{ props.type === SENTENCE_STATE_SUBMITTED ? 'Review' : ''}</a>
  );
};

const ConfirmForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <h2>Confirm New Sentences</h2>
    <p>
      {`${props.submitted.length} sentences found.`}
    </p>
    {(props.existing && props.existing.length > 0) && (
      <p>
        {`${props.existing.length} sentences were previously submitted.`}
      </p>
    )}
    {props.invalidated.length + props.filtered.length > 0 && (
      <p style={{color: 'red'}}>
        {
          `${props.filtered.length} sentences were not matching the requirements.` +
          (props.invalidated.length > 0 ?
            ` (${props.invalidated.length} more rejected by you) ` : '')
        }&nbsp;
        <ReviewLink onReview={props.onReview}
                    sentences={props.filtered}
                    type={SENTENCE_STATE_FILTERED} />
      </p>
    )}
    {props.unreviewed.length > 0 && (
      <p>
        {`-- ${props.unreviewed.length} of these sentences are unreviewed.`}&nbsp;
        <ReviewLink onReview={props.onReview}
                    sentences={props.unreviewed}
                    type={SENTENCE_STATE_SUBMITTED} />
      </p>
    )}
    {props.validated.length + props.invalidated.length > 0 && (
      <p>
        {`-- ${props.validated.length + props.invalidated.length}`}&nbsp;
        sentences are already reviewed. Great job!
      </p>
    )}
    <p><b>{`${props.ready.length} sentences ready for submission!`}</b></p>
    <p>By submitting these sentences you grant a <a href="https://en.wikipedia.org/wiki/Public_domain" target="_blank">Public Domain License</a> for self-written sentences, or declare that sentences from a third-party are under Public Domain License and can be used.</p>
    <section id="confirm-buttons">
      <button type="submit" disabled={props.ready.length === 0}>Confirm</button>
      <button onClick={props.onCancel}>Cancel</button>
    </section>

    {props.invalidated.length + props.filtered.length > 0 && (
      <section>
        <h2>Filtered sentences due to requirements failing:</h2>
        {props.filtered.map(sentence => <p>{sentence}</p>)}
      </section>
    )}
  </form>
);


const SubmitForm = (props) => (
  <form id="add-form" onSubmit={props.onSubmit}>
    <h2>Add Sentences</h2>
    <p>Please add your sentences by typing or copy & pasting them below.</p>
    <section id="form-message">
      {props.message}
    </section>
    <section id="form-error">
      {props.error}
    </section>
    <section>
      <label className="language-selector-label" htmlFor="language-selector">
        Select Language
      </label>
      <LanguageSelector name="language-selector" only={props.languages}/>
    </section>
    <section>
      <label htmlFor="sentences-input">Enter sentences</label>
      <textarea id="sentences-input" />
    </section>
    <section>
      <label htmlFor="source-input">Where did you get these sentences from?</label>
      <input id="source-input" type="text" />
    </section>
    <section>
      <button>Submit</button>
    </section>
  </form>
);
