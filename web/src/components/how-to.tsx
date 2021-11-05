import React from 'react';
import { Localized } from '@fluent/react';

export default function HowTo() {
  return (
    <section>
      <Localized id="sc-howto-title">
        <h1 id="how-to"></h1>
      </Localized>

      <Localized id="sc-howto-addlang-title">
        <h2 id="login"></h2>
      </Localized>
      <Localized id="sc-howto-addlang-text">
        <p></p>
      </Localized>

      <Localized id="sc-howto-addsen-title">
        <h2 id="add-new-sentences"></h2>
      </Localized>
      <ul>
        <Localized
          id="sc-howto-addsen-item-1"
          elems={{
            wikipediaLink: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Public_domain"
              />
            ),
            cc0WaiverLink: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://common-voice.github.io/community-playbook/sub_pages/cc0waiver_process.html"
              />
            ),
          }}
        >
          <li></li>
        </Localized>
        <Localized id="sc-howto-addsen-item-2">
          <li></li>
        </Localized>
        <Localized id="sc-howto-addsen-item-3">
          <li></li>
        </Localized>
        <Localized id="sc-howto-addsen-item-4">
          <li></li>
        </Localized>
        <Localized id="sc-howto-addsen-item-5">
          <li></li>
        </Localized>
        <Localized
          id="sc-howto-addsen-item-6"
          elems={{
            validationRulesLink: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/common-voice/sentence-collector/tree/main/server/lib/validation/languages"
              />
            ),
          }}
        >
          <li></li>
        </Localized>
      </ul>
      <Localized id="sc-howto-addsen-post-1">
        <p></p>
      </Localized>

      <Localized id="sc-howto-cite-title">
        <h2 id="how-to-reference-the-source"></h2>
      </Localized>

      <Localized
        id="sc-howto-cite-pre-1"
        elems={{
          copyrightIssuesLink: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767"
            />
          ),
        }}
      >
        <p></p>
      </Localized>
      <ul>
        <Localized id="sc-howto-cite-item-1">
          <li></li>
        </Localized>
        <Localized id="sc-howto-cite-item-2">
          <li></li>
        </Localized>
        <Localized id="sc-howto-cite-item-3">
          <li></li>
        </Localized>
      </ul>

      <Localized id="sc-howto-review-title">
        <h2 id="review-sentences"></h2>
      </Localized>

      <Localized id="sc-howto-review-subtitle">
        <h3 id="make-sure-the-sentence-meets-the-following-criteria-"></h3>
      </Localized>
      <ol>
        <Localized id="sc-howto-review-criteria-1">
          <li></li>
        </Localized>
        <Localized id="sc-howto-review-criteria-2">
          <li></li>
        </Localized>
        <Localized id="sc-howto-review-criteria-3">
          <li></li>
        </Localized>
        <Localized id="sc-howto-review-criteria-4">
          <li></li>
        </Localized>
        <Localized id="sc-howto-review-criteria-5">
          <li></li>
        </Localized>
        <Localized id="sc-howto-review-criteria-6">
          <li></li>
        </Localized>
      </ol>

      <Localized id="sc-howto-findpd-title">
        <h2 id="finding-existing-sentences-in-the-public-domain"></h2>
      </Localized>

      <Localized id="sc-howto-findpd-subtitle">
        <h3 id="search-for-them-on-the-internet"></h3>
      </Localized>
      <Localized
        id="sc-howto-findpd-text"
        elems={{
          wikipediaLink: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Public_domain"
            />
          ),
        }}
      >
        <p></p>
      </Localized>
      <Localized id="sc-howto-findpd-tips">
        <p></p>
      </Localized>
      <ul>
        <Localized id="sc-howto-findpd-tips-1">
          <li></li>
        </Localized>
        <Localized id="sc-howto-findpd-tips-2">
          <li></li>
        </Localized>
        <Localized id="sc-howto-findpd-tips-3">
          <li></li>
        </Localized>
      </ul>

      <Localized id="sc-howto-findpd-subtitle-2">
        <h3 id="partner-with-local-organizations-or-individuals"></h3>
      </Localized>
      <Localized id="sc-howto-findpd-partner-1">
        <p></p>
      </Localized>
      <Localized id="sc-howto-findpd-partner-2">
        <p></p>
      </Localized>
    </section>
  );
}
