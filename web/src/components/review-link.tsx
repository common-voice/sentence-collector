import React from 'react';
import { Localized } from '@fluent/react';

type Props = {
  sentences: string[];
  onReview: () => void;
};

export default function ReviewLink({ sentences, onReview }: Props) {
  return sentences.length > 0 ? (
    <a
      href="#"
      onClick={(evt) => {
        evt.preventDefault();
        onReview && onReview();
      }}
    >
      <Localized id="sc-review-link" />
    </a>
  ) : null;
}
