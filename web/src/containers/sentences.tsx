import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadMySentences, deleteSentences } from '../actions/sentences';
import MySentencesList from '../components/my-sentences-list';
import truthyFilter from '../truthyFilter';
import type { RootState } from '../types';

export default function Sentences() {
  const {
    mySentences = {},
    mySentencesLoading,
    mySentencesError,
    deleteSentencesLoading,
    deleteSentencesError,
  } = useSelector((state: RootState) => state.sentences);
  const dispatch = useDispatch();
  const [sentencesToDelete, setSentencesToDelete] = useState<Record<number, boolean>>({});

  useEffect(() => {
    dispatch(loadMySentences());
  }, []);
  
  const onSelectSentence = (sentenceId: string, checked: boolean) => {
    setSentencesToDelete((previousValue) => {
      const newSentencesToDelete = Object.assign({}, previousValue, {
        [sentenceId]: checked,
      });
      
      return newSentencesToDelete;
    });
  };
  
  const onDelete = () => {
    const sentenceIds = Object.entries(sentencesToDelete).map(([sentenceId, toDelete]) => {
      if (!toDelete) {
        return;
      }
      
      return parseInt(sentenceId, 10);
    }).filter(truthyFilter);
    dispatch(deleteSentences(sentenceIds));
    setSentencesToDelete({});
  };

  return (
    <React.Fragment>
      <h1>Your sentences</h1>
      <MySentencesList
        sentences={mySentences}
        loading={mySentencesLoading}
        error={mySentencesError}
        onSelectSentence={onSelectSentence}
        onDelete={onDelete}
        deleteSentencesLoading={deleteSentencesLoading}
        deleteSentencesError={deleteSentencesError}
      />
    </React.Fragment>
  );
}
