import React from 'react';

import type { AllStats } from '../types';

type Props = {
  languageStats: AllStats | undefined
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
