import React from 'react';
import { connect } from 'react-redux';

import LanguageSelector from './language-selector';

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    this.props.onSubmit(evt);
  }

  render() {
    const {
      message,
      error,
      languages,
      allLanguages,
      sentenceSubmissionFailures,
    } = this.props;

    let extendedLanguages = languages.map((lang) => allLanguages.find((extendedLanguage) => extendedLanguage.id === lang)).filter(Boolean);
    if (extendedLanguages.length < 1) {
      extendedLanguages = allLanguages;
    }

    return (
      <React.Fragment>
        <form id="add-form" onSubmit={this.onSubmit}>
          <h2>Add Sentences</h2>

          { message && (<section className="form-message">{ message }</section>)}
          { error && (<section className="form-error">{ error }</section>)}

          <section>
            <label className="language-selector-label" htmlFor="language-selector">
              Select Language
            </label>
            <LanguageSelector name="language-selector" languages={extendedLanguages}/>
          </section>
          <section>
            <label htmlFor="sentences-input">
              Add <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> sentences
            </label>
            <textarea id="sentences-input" placeholder="One sentence per line" />
          </section>
          <section>
            <label htmlFor="source-input">
              Where are these <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> sentences from?
            </label>
            <input id="source-input" type="text" placeholder="Read our How-to if unsure how to attribute" />
          </section>
          <section>
            <input id="agree" type="checkbox" />
            <label htmlFor="agree">
              I confirm that these sentences are {}
              <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> {}
              and I have permission to upload them.
            </label>
          </section>

          <section id="confirm-buttons" className="divCenter">
            <button>Submit</button>
          </section>
        </form>

        { Object.keys(sentenceSubmissionFailures).length > 0 && (
          <section>
            <h2>Filtered sentences due to requirements failing (please submit fixed versions as new sentences):</h2>
            <p>Please check the <a href="https://common-voice.github.io/sentence-collector/#/how-to">guidelines</a>.</p>

            {
              Object.keys(sentenceSubmissionFailures).map((filterKey) => (
                <React.Fragment key={'fragment-' + filterKey}>
                  <h3 key="{filterKey}">{ filterKey }</h3>
                  {
                    sentenceSubmissionFailures[filterKey].map((filteredSentence) =>
                      <p key={filteredSentence}>{filteredSentence}</p>
                    )
                  }
                </React.Fragment>
              ))
            }
          </section>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    allLanguages: state.languages.allLanguages,
    languages: state.languages.languages,
    errorMessage: state.sentences.errorMessage,
    sentenceSubmissionFailures: state.sentences.sentenceSubmissionFailures,
  };
}

export default connect(mapStateToProps)(SubmitForm);