import React from 'react';

import SpinnerButton from './spinner-button';

export default function SubmitButton({ pendingAction, submitText }) {
  return (
    <section id="confirm-buttons" className="divCenter">
      { pendingAction ?
        <SpinnerButton></SpinnerButton> :
        <button type="submit">{submitText}</button>
      }
    </section>
  );
}
