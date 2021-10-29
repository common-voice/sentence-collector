// LOCALIZATION VERSION
import React from 'react';
import { Localized, useLocalization } from '@fluent/react';

import Modal from './modal';

export default function ReviewCriteria() {
  const { l10n } = useLocalization();
  const l10nModalText = l10n.getString('sc-criteria-modal');

  return (
    <Modal text={l10nModalText}>
      <Localized id="sc-criteria-title">
        <h2 id="review-criteria">Review Criteria</h2>
      </Localized>
      <Localized id="sc-criteria-make-sure">
        <h3>Make sure the sentence meets the following criteria:</h3>
      </Localized>
      <ol>
        <Localized id="sc-criteria-item-1">
          <li>The sentence must be spelled correctly.</li>
        </Localized>
        <Localized id="sc-criteria-item-2">
          <li>The sentence must be grammatically correct.</li>
        </Localized>
        <Localized id="sc-criteria-item-3">
          <li>The sentence must be speakable.</li>
        </Localized>
        <Localized id="sc-criteria-item-4">
          <li>
            If the sentence meets the criteria, click the &quot;yes&quot; button on the right.
          </li>
        </Localized>
        <Localized id="sc-criteria-item-5">
          <li>
            If the sentence does not meet the above criteria, click the &quot;no&quot; button on the
            right. If you are unsure about the sentence, you may also skip it and move on to the
            next one.
          </li>
        </Localized>
        <Localized id="sc-criteria-item-6">
          <li>If you run out of sentences to review, please help us collect more sentences!</li>
        </Localized>
      </ol>
    </Modal>
  );
}
