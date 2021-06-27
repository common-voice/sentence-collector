import React from 'react';

import '../../css/sentences-list.css';

import type { MySentences } from '../types';
import Sentence from './sentence';
import SpinnerButton from './spinner-button';

type Props = {
  onSelectSentence: (sentenceId: string, checked: boolean) => void
  onDelete: () => void
  loading: boolean
  sentences: MySentences
  error: string
  deleteSentencesLoading: boolean
  deleteSentencesError: string
}

export default function MySentencesList({
  loading,
  sentences = {},
  error,
  deleteSentencesLoading,
  deleteSentencesError,
  onSelectSentence,
  onDelete,
}: Props) {
  const hasNoSentences = Object.keys(sentences).length === 0;
  
  const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectSentence(event.target.name, event.target.checked);
  };
  
  const deleteSelected = (event: React.MouseEvent) => {
    event.preventDefault();
    onDelete();
  };

  return (
    <React.Fragment>
      <p>
        This page gives you an overview of all your submitted sentencens. You may also delete already
        submitted sentences if needed by marking the checkbox next to it and clicking on &quot;Remove sentences&quot;
        at the bottom. Please only remove sentences if absolutely necessary, for example if you noticed
        after the fact that a sentence is copyright protected.
      </p>
      
      { loading && (
        <p>Loading your sentences..</p>
      )}

      { error && (
        <p>Error while fetching your sentences: {error}</p>
      )}

      { hasNoSentences && !loading && (
        <p>No sentences found!</p>
      )}
      
      { Object.keys(sentences).map((language) => (
        <section key={'section-' + language} className="language-section">
          <h2 key={language}>{language}</h2>

          { Object.keys(sentences[language]).map((batchId) => (
            <section key={'section-' + language + '-' + batchId} className="submission-section">
              <h3 key={batchId}>Submission: {batchId}</h3>
              <small>Source: {sentences[language][batchId].source}</small>

              <ul key={'list-' + language + '-' + batchId} className="no-bullets">
                { sentences[language][batchId].sentences.map((sentence) => (
                  <li key={sentence.id}>
                    <input type="checkbox" id={'sentence-' + sentence.id} name={sentence.id?.toString()} onChange={onSelect}></input>
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

      { !deleteSentencesLoading && (
        <button className="standalone" onClick={deleteSelected}>Delete selected sentences</button>
      )}
      
      { deleteSentencesLoading && (
        <SpinnerButton text="Deleting selected sentences..."></SpinnerButton>
      )}
      
      { deleteSentencesError && (
        <p>Failed to delete selected sentences.. Please try again!</p>
      )}
    </React.Fragment>
  );
}
