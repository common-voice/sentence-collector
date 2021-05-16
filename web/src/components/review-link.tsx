import React from 'react';

export default function ReviewLink({ sentences, onReview }) {
  return sentences.length > 0 && (
    <a href="#" onClick={(evt) => {
      evt.preventDefault();
      onReview && onReview();
    }}>Review</a>
  );
}
