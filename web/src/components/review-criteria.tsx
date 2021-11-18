import React from 'react';
import { Localized, useLocalization } from '@fluent/react';

import Modal from './modal';

export default function ReviewCriteria() {
  const { l10n } = useLocalization();

  return (
    <Modal text={l10n.getString('sc-criteria-modal')}>
      <Localized id="sc-criteria-title">
        <h2 id="review-criteria"></h2>
      </Localized>
      <Localized id="sc-criteria-make-sure">
        <h3></h3>
      </Localized>
      <ol>
        <Localized id="sc-criteria-item-1">
          <li></li>
        </Localized>
        <Localized id="sc-criteria-item-2">
          <li></li>
        </Localized>
        <Localized id="sc-criteria-item-3">
          <li></li>
        </Localized>
        <Localized id="sc-criteria-item-4">
          <li></li>
        </Localized>
        <Localized id="sc-criteria-item-5-2">
          <li></li>
        </Localized>
        <Localized id="sc-criteria-item-6">
          <li></li>
        </Localized>
      </ol>
    </Modal>
  );
}
