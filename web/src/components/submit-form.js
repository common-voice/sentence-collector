import React from 'react';
import { Link } from 'react-router-dom';

import LanguageSelector from './language-selector';

export default function SubmitForm({ languages, onSubmit, message, error, sentenceSubmissionFailures }) {
  return (
    <React.Fragment>
      <form id="add-form" onSubmit={onSubmit}>
        <h2>Add Sentences</h2>

        { message && (<section className="form-message">{ message }</section>)}
        { error && (<section className="form-error">{ error }</section>)}

        <section>
          <LanguageSelector name="language-selector" languages={languages} labelText="Select Language"/>
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
          <p>Please check the <Link to={'/how-to'}>guidelines</Link>.</p>

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
