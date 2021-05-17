import React from 'react';

type Props = {
  sentences: string[]
  onReview: () => void
}

export default function ReviewLink({ sentences, onReview }: Props) {
  return sentences.length > 0 && (
    <a href="#" onClick={(evt) => {
      evt.preventDefault();
      onReview && onReview();
    }}>Review</a>
  );
}
