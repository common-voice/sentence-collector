import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Localized } from '@fluent/react';

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
      <Localized id="sc-settings-title">
        <h2>Settings</h2>
      </Localized>

      {errorMessage && <p className="form-error">{errorMessage}</p>}

      <section>
        <Localized id="sc-settings-reset-skipped">
          <h3>Reset skipped sentences</h3>
        </Localized>
        <Localized id="sc-settings-skipped-decription">
          <p>
            You previously skipped sentences while reviewing. Resetting skipped sentences will show
            all skipped sentences again. This is independent of the language.
          </p>
        </Localized>
        <button className="standalone" onClick={resetSkipped}>
          <Localized id="sc-settings-show-all-button">Show all skipped sentences again</Localized>
        </button>
      </section>
    </section>
  );
}
