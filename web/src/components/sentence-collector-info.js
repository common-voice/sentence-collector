import React from 'react';

const SentenceCollectorInfo = (props) => {
  return props.languageStats && (
    <p>
     The Common Voice Sentence Collector has
     collected <strong>{props.languageStats.total}</strong> sentences
     in <strong>{props.languageStats.languages}</strong> languages!
    </p>
  ) || null;
};

export default SentenceCollectorInfo;
