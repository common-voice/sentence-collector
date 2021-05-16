import React from 'react';

export default function SentenceCollectorInfo({ languageStats }) {
  return languageStats && (
    <p>
     The Common Voice Sentence Collector has
     collected <strong>{languageStats.total}</strong> sentences
     in <strong>{languageStats.languages}</strong> languages!
    </p>
  ) || null;
}
