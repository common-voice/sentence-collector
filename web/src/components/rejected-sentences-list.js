import React from 'react';
import { useSelector } from 'react-redux';

export default function RejectedSentencesList() {
  const {
    rejectedSentences = [],
    rejectedSentencesLoading,
    rejectedSentencesError,
  } = useSelector((state) => state.sentences);

  const hasNoSentences = !rejectedSentencesLoading && !rejectedSentencesError && Object.keys(rejectedSentences).length === 0;

  return (
    <React.Fragment>
      { rejectedSentencesLoading && (
        <p>Loading rejected sentences..</p>
      )}

      { rejectedSentencesError && (
        <p>Error while fetching rejected sentences: {rejectedSentencesError}</p>
      )}

      { hasNoSentences && (
        <p>No rejected sentences found!</p>
      )}

      { Object.keys(rejectedSentences).map((language) => (
        <section key={'section-' + language}>
          <h2 key={language}>{language}</h2>

          <ul key={'list-' + language} className="no-bullets">
            { rejectedSentences[language].map((sentence) => (
              <li key={sentence.id}>{sentence.sentence}</li>
            ))}
          </ul>
        </section>
      ))}
    </React.Fragment>
  );
}
