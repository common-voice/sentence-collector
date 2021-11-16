import React from 'react';
import { Localized } from '@fluent/react';

import '../../css/footer.css';

export default function Footer() {
  return (
    <footer>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://discourse.mozilla.org/tags/c/voice/sentence-collection"
      >
        <Localized id="sc-footer-discourse" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Common-Voice/sentence-collector/issues"
      >
        <Localized id="sc-footer-report-bugs" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://pontoon.mozilla.org/projects/common-voice/"
      >
        <Localized id="sc-footer-translate" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767"
      >
        <Localized id="sc-footer-report-copyright" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://commonvoice.mozilla.org/privacy">
        <Localized id="sc-footer-privacy" />
      </a>
      <a target="_blank" rel="noopener noreferrer" href="https://commonvoice.mozilla.org/terms">
        <Localized id="sc-footer-terms" />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.mozilla.org/en-US/privacy/websites/#cookies"
      >
        <Localized id="sc-footer-cookies" />
      </a>
    </footer>
  );
}
