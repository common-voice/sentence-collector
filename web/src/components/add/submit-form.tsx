import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Localized } from '@fluent/react';

import { useLocaleUrl } from '../../urls';
import type { Language, SubmissionFailures } from '../../types';
import Error from '../error';
import LanguageSelector from '../language-selector';
import Sentence from '../sentence';
import SubmitButton from '../submit-button';
import Success from '../success';
import { Prompt } from '../prompt';

const SPLIT_ON = '\n';
const TRANSLATION_KEY_PREFIX = 'TRANSLATION_KEY:';

type SubmissionData = {
  sentences: string[];
  language: string;
  source: string;
};

type Props = {
  languages: Language[];
  onSubmit: (data: SubmissionData) => void;
  duplicates?: number;
  error?: string;
  sentenceSubmissionFailures?: SubmissionFailures;
  languageFetchFailure?: boolean;
};

type FormFields = {
  sentenceText: string;
  source: string;
  confirmed: boolean;
};

type FormErrorDescription = {
  language: boolean;
  sentences: boolean;
  source: boolean;
  confirmed: boolean;
};

export default function SubmitForm({
  languages,
  onSubmit,
  duplicates,
  error,
  sentenceSubmissionFailures,
  languageFetchFailure = false,
}: Props) {
  const [formErrors, setFormErrors] = useState<FormErrorDescription | Record<string, never>>({});
  const [formFields, setFormFields] = useState<FormFields>({
    sentenceText: '',
    source: '',
    confirmed: false,
  });
  const [language, setLanguage] = useState('');
  const localizedHowToUrl = useLocaleUrl('/how-to');

  useEffect(() => {
    if (languages.length === 1 && languages[0]) {
      setLanguage(languages[0].id);
    }
  }, [languages]);

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

  const validateForm = () => {
    const errors = {
      language: !language,
      sentences: !formFields.sentenceText,
      source: !formFields.source,
      confirmed: !formFields.confirmed,
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((errorState) => errorState);
    return !hasErrors;
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
          <Prompt when={formFields.sentenceText !== ''} message="" />
        </Localized>

        <Localized id="sc-submit-title">
          <h1></h1>
        </Localized>

        {languageFetchFailure && <Error translationKey="sc-languages-fetch-error" />}
        {typeof duplicates !== 'undefined' && (
          <Success translationKey="sc-add-result" vars={{ duplicates }} />
        )}
        {error && <Error>{error}</Error>}

        <section>
          <Localized id="sc-submit-select-language" attrs={{ labelText: true }}>
            <LanguageSelector languages={languages} labelText="" onChange={onLanguageSelect} />
          </Localized>

          {formErrors.language && (
            <Localized id="sc-submit-err-select-lang">
              <p className="error-message"></p>
            </Localized>
          )}
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
            <label htmlFor="sentences-input"></label>
          </Localized>

          {formErrors.sentences && (
            <Localized id="sc-submit-err-add-sentences">
              <p className="error-message"></p>
            </Localized>
          )}

          <Localized id="sc-submit-ph-one-per-line" attrs={{ placeholder: true }}>
            <textarea
              id="sentences-input"
              name="sentenceText"
              placeholder=""
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
            <label htmlFor="source-input"></label>
          </Localized>

          {formErrors.source && (
            <Localized id="sc-submit-err-add-source">
              <p className="error-message"></p>
            </Localized>
          )}

          <Localized id="sc-submit-ph-read-how-to" attrs={{ placeholder: true }}>
            <input
              id="source-input"
              type="text"
              name="source"
              placeholder=""
              onChange={handleInputChange}
            />
          </Localized>
        </section>

        <section>
          {formErrors.confirmed && (
            <Localized id="sc-submit-err-confirm-pd">
              <p className="error-message"></p>
            </Localized>
          )}

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
            <label htmlFor="agree"></label>
          </Localized>
        </section>

        <Localized id="sc-submit-button" attrs={{ submitText: true }}>
          <SubmitButton submitText="" pendingAction={false} />
        </Localized>
      </form>

      {sentenceSubmissionFailures && Object.keys(sentenceSubmissionFailures).length > 0 && (
        <section>
          <Localized id="sc-submit-filtered">
            <h2></h2>
          </Localized>
          <Localized
            id="sc-submit-guidelines"
            elems={{
              howToLink: <Link to={localizedHowToUrl}></Link>,
            }}
          >
            <p></p>
          </Localized>

          {Object.keys(sentenceSubmissionFailures).map((filterKey) => {
            const title = filterKey.startsWith(TRANSLATION_KEY_PREFIX) ? (
              <Localized id={filterKey.replace(TRANSLATION_KEY_PREFIX, '')}></Localized>
            ) : (
              filterKey
            );

            return (
              <React.Fragment key={'fragment-' + filterKey}>
                <h3 key="{filterKey}">{title}</h3>
                {sentenceSubmissionFailures[filterKey].map((filteredSentence) => (
                  <Sentence key={filteredSentence}>{filteredSentence}</Sentence>
                ))}
              </React.Fragment>
            );
          })}
        </section>
      )}
    </React.Fragment>
  );
}

function parseSentences(sentenceText: string): string[] {
  const sentences = sentenceText
    .split(SPLIT_ON)
    .map((s) => s.trim())
    .filter(Boolean);
  const dedupedSentences = Array.from(new Set(sentences));
  return dedupedSentences;
}
