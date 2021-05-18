import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import type { Language } from '../types';
import LanguageSelector from './language-selector';
import Sentence from './sentence';
import SubmitButton from './submit-button';

const SPLIT_ON = '\n';

function parseSentences(sentenceText: string): string[] {
  const sentences = sentenceText.split(SPLIT_ON).map(s => s.trim()).filter(Boolean);
  const dedupedSentences = Array.from(new Set(sentences));
  return dedupedSentences;
}

type SubmissionData = {
  sentences: string[]
  language: string
  source: string
}

type Props = {
  languages: Language[]
  onSubmit: (data: SubmissionData) => void
  message?: string
  error?: string
  sentenceSubmissionFailures?: Record<string, string[]>
}

type FormFields = {
  sentenceText: string
  source: string
  confirmed: boolean
}

export default function SubmitForm({ languages, onSubmit, message, error, sentenceSubmissionFailures }: Props) {
  const firstLanguage = languages.length === 1 && languages[0];
  const [formError, setError] = useState('');
  const [formFields, setFormFields] = useState<FormFields>({});
  const [language, setLanguage] = useState(firstLanguage ? firstLanguage.id : undefined);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const onLanguageSelect = (language) => {
    setLanguage(language);
  };

  const validateForm = () => {
    if (!language) {
      setError('Please select a language.');
      return false;
    }

    if (!formFields.sentenceText) {
      setError('Please add sentences.');
      return false;
    }

    if (!formFields.source) {
      setError('Please add a source.');
      return false;
    }

    if (!formFields.confirmed) {
      setError('Please confirm that these sentences are public domain.');
      return false;
    }

    return true;
  };

  const onSentencesSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return false;
    }

    const sentences = parseSentences(formFields.sentenceText);
    onSubmit({
      sentences,
      language,
      source: formFields.source,
    });
  };

  return (
    <React.Fragment>
      <form id="add-form" onSubmit={onSentencesSubmit}>
        <h1>Add Sentences</h1>

        { message && (<section className="form-message">{ message }</section>)}
        { formError && (<section className="form-error">{ formError }</section>)}
        { error && (<section className="form-error">{ error }</section>)}

        <section>
          <LanguageSelector name="language-selector" languages={languages} labelText="Select Language" onChange={onLanguageSelect}/>
        </section>
        <section>
          <label htmlFor="sentences-input">
            Add <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> sentences
          </label>
          <textarea id="sentences-input" name="sentenceText" placeholder="One sentence per line" onChange={handleInputChange} lang={language}/>
        </section>
        <section>
          <label htmlFor="source-input">
            Where are these <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> sentences from?
          </label>
          <input id="source-input" type="text" name="source" placeholder="Read our How-to if unsure how to attribute" onChange={handleInputChange}/>
        </section>
        <section>
          <input id="agree" type="checkbox" name="confirmed" onChange={handleInputChange}/>
          <label htmlFor="agree">
            I confirm that these sentences are {}
            <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Public_domain">public domain</a> {}
            and I have permission to upload them.
          </label>
        </section>

        <SubmitButton submitText="Submit" pendingAction={false}/>
      </form>

      { sentenceSubmissionFailures && Object.keys(sentenceSubmissionFailures).length > 0 && (
        <section>
          <h2>Filtered sentences due to requirements failing (please submit fixed versions as new sentences):</h2>
          <p>Please check the <Link to={'/how-to'}>guidelines</Link>.</p>

          {
            Object.keys(sentenceSubmissionFailures).map((filterKey) => (
              <React.Fragment key={'fragment-' + filterKey}>
                <h3 key="{filterKey}">{ filterKey }</h3>
                {
                  sentenceSubmissionFailures[filterKey].map((filteredSentence) =>
                    <Sentence key={filteredSentence}>{filteredSentence}</Sentence>
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
