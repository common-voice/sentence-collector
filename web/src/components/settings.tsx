import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Localized } from '@fluent/react';

import { resetSkippedSentences } from '../actions/sentences';
import type { RootState } from '../types';

export default function Settings() {
  const { skippedSentences } = useSelector((state: RootState) => state.sentences);
  const { showErrorMessage } = useSelector((state: RootState) => state.settings);
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
        <h2></h2>
      </Localized>

      {showErrorMessage && (
        <Localized id="sc-settings-failed">
          <p className="form-error"></p>
        </Localized>
      )}

      <section>
        <Localized id="sc-settings-reset-skipped">
          <h3></h3>
        </Localized>
        <Localized id="sc-settings-skipped-decription">
          <p></p>
        </Localized>
        <button className="standalone" onClick={resetSkipped}>
          <Localized id="sc-settings-show-all-button" />
        </button>
      </section>
    </section>
  );
}
