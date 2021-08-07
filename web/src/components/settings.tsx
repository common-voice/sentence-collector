import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSkippedSentences } from '../actions/sentences';
import type { RootState } from '../types';

export default function Settings() {
  const { skippedSentences } = useSelector((state: RootState) => state.sentences);
  const { errorMessage } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const resetSkipped = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(resetSkippedSentences());
  };

  if (!skippedSentences || skippedSentences.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>Settings</h2>

      {errorMessage && <p className="form-error">{errorMessage}</p>}

      <section>
        <h3>Reset skipped sentences</h3>
        <p>
          You previously skipped sentences while reviewing. Resetting skipped sentences will show
          all skipped sentences again. This is independent of the language.
        </p>
        <button className="standalone" onClick={resetSkipped}>
          Show all skipped sentences again
        </button>
      </section>
    </section>
  );
}
