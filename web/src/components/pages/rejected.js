import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadRejectedSentences } from '../../actions/sentences';

export default function Rejected() {
  const dispatch = useDispatch();
  const {
    rejectedSentences = [],
    rejectedSentencesLoading,
    rejectedSentencesError,
  } = useSelector((state) => state.sentences);

  useEffect(() => {
    dispatch(loadRejectedSentences());
  }, []);

  return (
    <React.Fragment>
      <h1>Your rejected sentences</h1>

      { rejectedSentencesLoading && (
        <p>Loading rejected sentences..</p>
      )}

      { rejectedSentencesError && (
        <p>Error while fetching rejected sentences: {rejectedSentencesError}</p>
      )}

      { !rejectedSentencesLoading && !rejectedSentencesError && Object.keys(rejectedSentences).length === 0 && (
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
