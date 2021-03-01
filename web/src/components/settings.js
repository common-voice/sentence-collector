import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSetting } from '../actions/settings';

export default function Settings() {
  const dispatch = useDispatch();
  const { useSwipeReview, errorMessage } = useSelector((state) => state.settings);

  const toggleSwipeReview = (evt) => {
    evt.preventDefault();
    dispatch(setSetting('useSwipeReview', !useSwipeReview));
  };

  return (
    <section>
      <h2>Settings</h2>

      { errorMessage && (
        <p className="form-error">{errorMessage}</p>
      )}

      <p>
        Experimental: There are two different tools with which you can review sentences. The normal tool lists 5 sentences per page
        and has an approval and rejection button each. The Swiping tool displays one card at a time where you can swipe right
        or left to approve and reject sentences. Both work on Desktop, for touch interfaces we would suggest to try out
        the swiping tool.
      </p>

      {!useSwipeReview && (
        <button onClick={toggleSwipeReview}>Use Swiping Review Tool</button>
      )}
      {useSwipeReview && (
        <button onClick={toggleSwipeReview}>Use Normal Review Tool</button>
      )}
    </section>
  );
}
