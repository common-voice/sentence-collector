import React from 'react';

import Sentence from './sentence';

export default function RejectedSentencesList({ loading, sentences = [], error }) {
  const hasNoSentences = Object.keys(sentences).length === 0;

  return (
    <React.Fragment>
      { loading && (
        <p>Loading rejected sentences..</p>
      )}

      { error && (
        <p>Error while fetching rejected sentences: {error}</p>
      )}

      { hasNoSentences && !loading && (
        <p>No rejected sentences found!</p>
      )}

      { Object.keys(sentences).map((language) => (
        <section key={'section-' + language}>
          <h2 key={language}>{language}</h2>

          <ul key={'list-' + language} className="no-bullets">
            { sentences[language].map((sentence) => (
              <li key={sentence.id}><Sentence language={language}>{sentence.sentence}</Sentence></li>
            ))}
          </ul>
        </section>
      ))}
    </React.Fragment>
  );
}
