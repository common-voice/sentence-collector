import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSkippedSentences } from '../actions/sentences';
import { setSetting } from '../actions/settings';
import type { RootState } from '../types';

export default function Settings() {
  const { skippedSentences } = useSelector((state: RootState) => state.sentences);
  const {
    useSwipeReview,
    errorMessage,
  } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const toggleSwipeReview = (evt: React.FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setSetting('useSwipeReview', !useSwipeReview));
  };

  const resetSkipped = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(resetSkippedSentences());
  };

  return (
    <section>
      <h2>Settings</h2>

      { errorMessage && (
        <p className="form-error">{errorMessage}</p>
      )}

      <section>
        <h3>Swipe Review Tool</h3>
        <p>
          Experimental: There are two different tools with which you can review sentences. The normal tool lists 5 sentences per page
          and has an approval and rejection button each. The Swiping tool displays one card at a time where you can swipe right
          or left to approve and reject sentences. Both work on Desktop, for touch interfaces we would suggest to try out
          the swiping tool.
        </p>

        {!useSwipeReview && (
          <button className="standalone" onClick={toggleSwipeReview}>Use Swiping Review Tool</button>
        )}
        {useSwipeReview && (
          <button className="standalone" onClick={toggleSwipeReview}>Use Normal Review Tool</button>
        )}
      </section>

      { skippedSentences && skippedSentences.length > 0 && (
        <section>
          <h3>Reset skipped sentences</h3>
          <p>
            You previously skipped sentences while reviewing. Resetting skipped sentences will show all skipped sentences again.
            This is independent of the language.
          </p>
          <button className="standalone" onClick={resetSkipped}>Show all skipped sentences again</button>
        </section>
      )}
    </section>
  );
}
