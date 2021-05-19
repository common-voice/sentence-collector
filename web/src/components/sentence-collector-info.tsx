import React from 'react';

import type { TotalStats } from '../types';

type Props = {
  totals: TotalStats | undefined
}

export default function SentenceCollectorInfo({ totals }: Props) {
  return totals && (
    <p>
     The Common Voice Sentence Collector has
     collected <strong>{totals.total}</strong> sentences
     in <strong>{totals.languages}</strong> languages!
    </p>
  ) || null;
}
