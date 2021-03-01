import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadRejectedSentences } from '../actions/sentences';
import RejectedSentencesList from '../components/rejected-sentences-list';

export default function Rejected() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRejectedSentences());
  }, []);

  return (
    <React.Fragment>
      <h1>Your rejected sentences</h1>
      <RejectedSentencesList/>
    </React.Fragment>
  );
}
