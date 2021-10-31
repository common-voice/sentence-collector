import React, { useEffect, useState } from 'react';
import { Localized } from '@fluent/react';

import { sendRequest } from '../backend';
import type { SentenceRecord } from '../types';
import Sentence from './sentence';

export type RejectedSentences = Record<string, SentenceRecord[]>;

export default function RejectedSentencesList() {
  const [sentencesLoading, setSentencesLoading] = useState<boolean>(false);
  const [sentences, setSentences] = useState<RejectedSentences>({});
  const [error, setError] = useState<Error>();
  const hasNoSentences = Object.keys(sentences).length === 0;

  const fetchSentences = async () => {
    try {
      setError(undefined);
      setSentencesLoading(true);
      const results = await sendRequest<RejectedSentences>('sentences/rejected');
      setSentencesLoading(false);
      setSentences(results);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchSentences();
  }, []);

  return (
    <React.Fragment>
      <Localized id="sc-rejected-title">
        <h1>Rejected Sentences</h1>
      </Localized>

      {sentencesLoading && (
        <Localized id="sc-rejected-loading">
          <p>Loading rejected sentences..</p>
        </Localized>
      )}

      {error && (
        <Localized id="sc-rejected-err-fetching">
          <p>Error while fetching rejected sentences. Please try again.</p>
        </Localized>
      )}

      {hasNoSentences && !sentencesLoading && !error && (
        <Localized id="sc-rejected-none-found">
          <p>No rejected sentences found!</p>
        </Localized>
      )}

      {Object.keys(sentences).map((language) => (
        <section key={'section-' + language}>
          <h2 key={language}>{language}</h2>

          <ul key={'list-' + language} className="no-bullets">
            {sentences[language].map((sentence) => (
              <li key={sentence.id}>
                <Sentence language={language}>{sentence.sentence}</Sentence>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </React.Fragment>
  );
}
