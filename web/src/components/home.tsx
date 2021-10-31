import React from 'react';
import { Link } from 'react-router-dom';
import { Localized } from '@fluent/react';

import { useLocaleUrl } from '../urls';

import '../../css/home.css';

export default function Home() {
  return (
    <div id="home">
      <Localized id="sc-home-title">
        <h1>Welcome to the Common Voice Sentence Collector</h1>
      </Localized>
      <Localized
        id="sc-home-intro"
        elems={{
          commonVoiceLink: (
            <a target="_blank" rel="noopener noreferrer" href="https://commonvoice.mozilla.org/" />
          ),
        }}
      >
        <p>
          The Sentence Collector is part of{' '}
          <a href="https://commonvoice.mozilla.org/">Common Voice</a>. It allows contributors to
          collect and validate sentences created by the community. You can use this tool also to
          import and clean-up small-to-medium-sized public domain corpus you have found or
          collected. All sentences need to be Public Domain. Approved sentences are exported every
          week to the Common Voice repository and are released on the Common Voice website on every
          new deployment.
        </p>
      </Localized>
      <section id="contribute">
        <Link to={useLocaleUrl('/add')}>
          <div className="contributeCard">
            <Localized id="sc-home-collect-title">
              <h2>Collect sentences</h2>
            </Localized>
            <Localized id="sc-home-collect-text">
              <p>Help us by writing or collecting Public Domain sentences.</p>
            </Localized>
          </div>
        </Link>
        <Link to={useLocaleUrl('/review')}>
          <div className="contributeCard">
            <Localized id="sc-home-review-title">
              <h2>Review sentences</h2>
            </Localized>
            <Localized id="sc-home-review-text">
              <p>Help us by reviewing sentences for correctness according to the guidelines.</p>
            </Localized>
          </div>
        </Link>
      </section>
    </div>
  );
}
