import React from 'react';

import Modal from './modal';

export default function ReviewCriteria() {
  return (
    <Modal text="ⓘ Review Criteria">
      <h2 id="review-criteria">Review Criteria</h2>
      <h3>Make sure the sentence meets the following criteria:</h3>
      <ol>
        <li>The sentence must be spelled correctly.</li>
        <li>The sentence must be grammatically correct.</li>
        <li>The sentence must be speakable.</li>
        <li>If the sentence meets the criteria, click the &quot;yes&quot; button on the right.</li>
        <li>If the sentence does not meet the above criteria, click the &quot;no&quot; button on the right. If you are unsure about the sentence, you may also skip it and move on to the next one.</li>
        <li>If you run out of sentences to review, please help us collect more sentences!</li>
      </ol>
    </Modal>
  );
}
