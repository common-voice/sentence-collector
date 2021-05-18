import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadRejectedSentences } from '../actions/sentences';
import RejectedSentencesList from '../components/rejected-sentences-list';
import type { RootState } from '../types';

export default function Rejected() {
  const {
    rejectedSentences = {},
    rejectedSentencesLoading,
    rejectedSentencesError,
  } = useSelector((state: RootState) => state.sentences);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRejectedSentences());
  }, []);

  return (
    <React.Fragment>
      <h1>Your rejected sentences</h1>
      <RejectedSentencesList
        sentences={rejectedSentences}
        loading={rejectedSentencesLoading}
        error={rejectedSentencesError}
      />
    </React.Fragment>
  );
}
