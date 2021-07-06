import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/home.css';

export default function Home() {
  return (
    <div id="home">
      <h1>Welcome to the Common Voice Sentence Collector</h1>
      <p>
        The Sentence Collector is part of <a href="https://commonvoice.mozilla.org/">Common Voice</a>.
        It allows contributors to collect and validate sentences created by the community.
        You can use this tool also to import and clean-up small-to-medium-sized public domain corpus you have found or collected.
        All sentences need to be Public Domain. Approved sentences are exported every week to the Common Voice repository and are
        released on the Common Voice website on every new deployment.
      </p>
      <section id="contribute">
        <Link to={'/add'}>
          <div className="contributeCard">
            <h2>Collect sentences</h2>
            <p>Help us by writing or collecting Public Domain sentences.</p>
          </div>
        </Link>
        <Link to={'/review'}>
          <div className="contributeCard">
            <h2>Review sentences</h2>
            <p>Help us by reviewing sentences for correctness according to the guidelines.</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
