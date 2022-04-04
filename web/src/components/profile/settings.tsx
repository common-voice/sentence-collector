import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Localized } from '@fluent/react';

import { resetSkippedSentences } from '../../actions/sentences';
import type { RootState } from '../../types';

import Error from '../error';
import LanguageSelector from '../language-selector';

export default function Settings() {
  const { allLanguages = [], currentUILocale } = useSelector((state: RootState) => state.languages);
  const { skippedSentences } = useSelector((state: RootState) => state.sentences);
  const { showErrorMessage } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  const history = useHistory();

  const resetSkipped = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(resetSkippedSentences());
  };

  const onLanguageSelect = (locale: string) => {
    history.push(`/${locale}/profile`);
  };

  return (
    <section>
      <Localized id="sc-settings-title">
        <h2></h2>
      </Localized>

      {showErrorMessage && <Error translationKey="sc-settings-failed" />}

      <section>
        <section className="settings-section">
          <Localized id="sc-settings-ui-language">
            <h3></h3>
          </Localized>
          <LanguageSelector
            selected={currentUILocale}
            languages={allLanguages}
            onChange={onLanguageSelect}
          />
        </section>

        {skippedSentences && skippedSentences.length > 0 && (
          <section className="settings-section">
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
        )}
      </section>
    </section>
  );
}
