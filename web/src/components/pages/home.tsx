import React from 'react';
import { Link } from 'react-router-dom';
import { Localized } from '@fluent/react';

import { useLocaleUrl } from '../../urls';

import '../../../css/home.css';

export default function Home() {
  return (
    <div id="home">
      <Localized id="sc-home-title">
        <h1></h1>
      </Localized>
      <Localized
        id="sc-home-intro"
        elems={{
          commonVoiceLink: (
            <a target="_blank" rel="noopener noreferrer" href="https://commonvoice.mozilla.org/" />
          ),
        }}
      >
        <p></p>
      </Localized>
      <section id="contribute">
        <Link to={useLocaleUrl('/add')}>
          <div className="contributeCard">
            <Localized id="sc-home-collect-title">
              <h2></h2>
            </Localized>
            <Localized id="sc-home-collect-text">
              <p></p>
            </Localized>
          </div>
        </Link>
        <Link to={useLocaleUrl('/review')}>
          <div className="contributeCard">
            <Localized id="sc-home-review-title">
              <h2></h2>
            </Localized>
            <Localized id="sc-home-review-text">
              <p></p>
            </Localized>
          </div>
        </Link>
      </section>
    </div>
  );
}
