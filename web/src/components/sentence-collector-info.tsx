import React from 'react';

type Stats {
  total: number
  languages: number
}

type Props = {
  languageStats: Stats | undefined
}

export default function SentenceCollectorInfo({ languageStats }: Props) {
  return languageStats && (
    <p>
     The Common Voice Sentence Collector has
     collected <strong>{languageStats.total}</strong> sentences
     in <strong>{languageStats.languages}</strong> languages!
    </p>
  ) || null;
}
