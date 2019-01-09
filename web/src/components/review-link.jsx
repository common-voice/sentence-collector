import React from 'react';

const ReviewLink = (props) => {
  return props.sentences.length > 0 && (
    <a href="#" onClick={evt => {
      evt.preventDefault();
      props.onReview && props.onReview();
    }}>Review</a>
  );
};

export default ReviewLink;