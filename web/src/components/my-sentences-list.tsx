import React, { useEffect, useState } from 'react';
import { Localized, useLocalization } from '@fluent/react';

import '../../css/sentences-list.css';

import { sendRequest } from '../backend';
import truthyFilter from '../truthyFilter';
import type { SentenceRecord } from '../types';
import Sentence from './sentence';
import SpinnerButton from './spinner-button';

type MySentenceBatch = {
  source: string;
  sentences: SentenceRecord[];
};

export type MySentences = Record<string, Record<string, MySentenceBatch>>;

export default function MySentencesList() {
  const [sentencesToDelete, setSentencesToDelete] = useState<Record<number, boolean>>({});
  const [sentencesLoading, setSentencesLoading] = useState<boolean>(false);
  const [sentences, setSentences] = useState<MySentences>({});
  const [error, setError] = useState<Error>();
  const [sentencesDeleting, setSentencesDeleting] = useState<boolean>(false);
  const [deletionError, setDeletionError] = useState<Error>();
  const hasNoSentences = Object.keys(sentences).length === 0;
  const { l10n } = useLocalization();

  const fetchSentences = async () => {
    try {
      setError(undefined);
      setSentencesLoading(true);
      const results = await sendRequest<MySentences>('sentences/my');
      setSentencesLoading(false);
      setSentences(results);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchSentences();
  }, []);

  const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSentencesToDelete((previousValue) => {
      return Object.assign({}, previousValue, {
        [event.target.name]: event.target.checked,
      });
    });
  };

  const deleteSelected = async (event: React.MouseEvent) => {
    event.preventDefault();

    const sentences = Object.entries(sentencesToDelete)
      .map(([sentenceId, toDelete]) => {
        if (!toDelete) {
          return;
        }

        return parseInt(sentenceId, 10);
      })
      .filter(truthyFilter);

    try {
      setDeletionError(undefined);
      setSentencesDeleting(true);
      await sendRequest<Record<string, never>>('sentences/delete', 'POST', { sentences });
      setSentencesDeleting(false);
      await fetchSentences();
    } catch (error) {
      setDeletionError(error);
    } finally {
      setSentencesToDelete({});
    }
  };

  return (
    <React.Fragment>
      <Localized id="sc-my-title">
        <h1></h1>
      </Localized>
      <Localized id="sc-my-description">
        <p></p>
      </Localized>

      {sentencesLoading && (
        <Localized id="sc-my-loading">
          <p></p>
        </Localized>
      )}

      {error && (
        <Localized id="sc-my-err-fetching">
          <p></p>
        </Localized>
      )}

      {hasNoSentences && !sentencesLoading && (
        <Localized id="sc-my-no-sentences">
          <p></p>
        </Localized>
      )}

      {Object.keys(sentences).map((language) => (
        <section key={'section-' + language} className="language-section">
          <h2 key={language}>{language}</h2>

          {Object.keys(sentences[language]).map((batchId) => (
            <section key={'section-' + language + '-' + batchId} className="submission-section">
              <Localized id="sc-my-submission" vars={{ batchId }}>
                <h3 key={batchId}></h3>
              </Localized>
              <Localized id="sc-my-source" vars={{ source: sentences[language][batchId].source }}>
                <small></small>
              </Localized>

              <ul key={'list-' + language + '-' + batchId} className="no-bullets">
                {sentences[language][batchId].sentences.map((sentence) => (
                  <li key={sentence.id}>
                    <input
                      type="checkbox"
                      id={'sentence-' + sentence.id}
                      name={sentence.id?.toString()}
                      onChange={onSelect}
                    ></input>
                    <label htmlFor={'sentence-' + sentence.id}>
                      <Sentence language={language}>{sentence.sentence}</Sentence>
                    </label>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>
      ))}

      {!sentencesDeleting && !hasNoSentences && !error && (
        <button className="standalone" onClick={deleteSelected}>
          <Localized id="sc-my-delete" />
        </button>
      )}

      {sentencesDeleting && <SpinnerButton text={l10n.getString('sc-my-deleting')}></SpinnerButton>}

      {deletionError && (
        <Localized id="sc-my-err-failed-delete">
          <p></p>
        </Localized>
      )}
    </React.Fragment>
  );
}
