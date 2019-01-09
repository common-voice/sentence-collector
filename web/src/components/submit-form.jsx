import React from 'react';
import { connect } from 'react-redux';

import LanguageSelector from './language-selector';

function mapStateToProps(state) {
  return {
    parsingSentences: state.parsingSentences,
    errorMessage: state.errorMessage,
  };
}

function mapDispatchToProps() {
  return {};
}

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.props.onSubmit.bind(this);
  }

  render() {
    const {
      message,
      error,
      errorMessage,
      languages,
      parsingSentences,
    } = this.props;

    return (
      <form id="add-form" onSubmit={this.onSubmit}>
        <h2>Add Sentences</h2>
        <p>Please add your sentences by typing or copy & pasting them below. <strong>Please make sure to add one sentence per line.</strong></p>

        <section id="form-message">
          { message }
        </section>
        <section id="form-error">
          { error || errorMessage }
        </section>

        <section>
          <label className="language-selector-label" htmlFor="language-selector">
            Select Language
          </label>
          <LanguageSelector name="language-selector" only={languages}/>
        </section>
        <section>
          <label htmlFor="sentences-input">Enter sentences (one per line)</label>
          <textarea id="sentences-input" />
        </section>
        <section>
          <label htmlFor="source-input">Where did you get these sentences from?</label>
          <input id="source-input" type="text" />
        </section>

        <section>
          { parsingSentences && (
            <p>
              <b>Sentences are being validated. This can take a few seconds depending on the number of sentences added.</b>
            </p>
          )}
          <button disabled={parsingSentences}>Submit</button>
        </section>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitForm);