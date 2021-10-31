import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Localized, useLocalization } from '@fluent/react';

import { useLocaleUrl } from '../urls';
import type { Language, SubmissionFailures } from '../types';
import LanguageSelector from './language-selector';
import Sentence from './sentence';
import SubmitButton from './submit-button';
import { Prompt } from './prompt';

const SPLIT_ON = '\n';

function parseSentences(sentenceText: string): string[] {
  const sentences = sentenceText
    .split(SPLIT_ON)
    .map((s) => s.trim())
    .filter(Boolean);
  const dedupedSentences = Array.from(new Set(sentences));
  return dedupedSentences;
}

type SubmissionData = {
  sentences: string[];
  language: string;
  source: string;
};

type Props = {
  languages: Language[];
  onSubmit: (data: SubmissionData) => void;
  message?: string;
  error?: string;
  sentenceSubmissionFailures?: SubmissionFailures;
};

type FormFields = {
  sentenceText: string;
  source: string;
  confirmed: boolean;
};

export default function SubmitForm({
  languages,
  onSubmit,
  message,
  error,
  sentenceSubmissionFailures,
}: Props) {
  const firstLanguage = languages.length === 1 && languages[0];
  const [formError, setError] = useState('');
  const [formFields, setFormFields] = useState<FormFields>({
    sentenceText: '',
    source: '',
    confirmed: false,
  });
  const [language, setLanguage] = useState(firstLanguage ? firstLanguage.id : '');
  const localizedHowToUrl = useLocaleUrl('/how-to');

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const onLanguageSelect = (language: string) => {
    setLanguage(language);
  };

  const { l10n } = useLocalization();

  const validateForm = () => {
    if (!language) {
      setError(l10n.getString('sc-submit-err-select-lang'));
      return false;
    }

    if (!formFields.sentenceText) {
      setError(l10n.getString('sc-submit-err-add-sentences'));
      return false;
    }

    if (!formFields.source) {
      setError(l10n.getString('sc-submit-err-add-source'));
      return false;
    }

    if (!formFields.confirmed) {
      setError(l10n.getString('sc-submit-err-confirm-pd'));
      return false;
    }

    return true;
  };

  const onSentencesSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        <Localized id="sc-submit-prompt" attrs={{ message: true }}>
          <Prompt
            when={formFields.sentenceText !== ''}
            message="Sentences not submitted, are you sure you want to leave?"
          />
        </Localized>

        <Localized id="sc-submit-title">
          <h1>Add Sentences</h1>
        </Localized>

        {message && <section className="form-message">{message}</section>}
        {formError && <section className="form-error">{formError}</section>}
        {error && <section className="form-error">{error}</section>}

        <section>
          <Localized id="sc-submit-select-language" attrs={{ labelText: true }}>
            <LanguageSelector
              languages={languages}
              labelText="Select Language"
              onChange={onLanguageSelect}
            />
          </Localized>
        </section>
        <section>
          <Localized
            id="sc-submit-add-sentences"
            elems={{
              wikipediaLink: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Public_domain"
                />
              ),
            }}
          >
            <label htmlFor="sentences-input">
              Add{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Public_domain"
              >
                public domain
              </a>{' '}
              sentences
            </label>
          </Localized>
          <Localized id="sc-submit-ph-one-per-line" attrs={{ placeholder: true }}>
            <textarea
              id="sentences-input"
              name="sentenceText"
              placeholder="One sentence per line"
              onChange={handleInputChange}
              lang={language}
            />
          </Localized>
        </section>
        <section>
          <Localized
            id="sc-submit-from-where"
            elems={{
              wikipediaLink: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Public_domain"
                />
              ),
            }}
          >
            <label htmlFor="source-input">
              Where are these{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Public_domain"
              >
                public domain
              </a>{' '}
              sentences from?
            </label>
          </Localized>
          <Localized id="sc-submit-ph-read-how-to" attrs={{ placeholder: true }}>
            <input
              id="source-input"
              type="text"
              name="source"
              placeholder="Read our How-to if unsure how to attribute"
              onChange={handleInputChange}
            />
          </Localized>
        </section>
        <section>
          <input id="agree" type="checkbox" name="confirmed" onChange={handleInputChange} />
          <Localized
            id="sc-submit-confirm"
            elems={{
              wikipediaLink: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://en.wikipedia.org/wiki/Public_domain"
                />
              ),
            }}
          >
            <label htmlFor="agree">
              I confirm that these sentences are {}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Public_domain"
              >
                public domain
              </a>{' '}
              {}
              and I have permission to upload them.
            </label>
          </Localized>
        </section>

        <Localized id="sc-submit-button" attrs={{ submitText: true }}>
          <SubmitButton submitText="Submit" pendingAction={false} />
        </Localized>
      </form>

      {sentenceSubmissionFailures && Object.keys(sentenceSubmissionFailures).length > 0 && (
        <section>
          <Localized id="sc-submit-filtered">
            <h2>
              Filtered sentences due to requirements failing (please submit fixed versions as new
              sentences):
            </h2>
          </Localized>
          <Localized
            id="sc-submit-guidelines"
            elems={{
              howToLink: <Link to={localizedHowToUrl}></Link>,
            }}
          >
            <p>
              Please check the <Link to={localizedHowToUrl}>guidelines</Link>.
            </p>
          </Localized>

          {Object.keys(sentenceSubmissionFailures).map((filterKey) => (
            <React.Fragment key={'fragment-' + filterKey}>
              <h3 key="{filterKey}">{filterKey}</h3>
              {sentenceSubmissionFailures[filterKey].map((filteredSentence) => (
                <Sentence key={filteredSentence}>{filteredSentence}</Sentence>
              ))}
            </React.Fragment>
          ))}
        </section>
      )}
    </React.Fragment>
  );
}
