import React from 'react';

import SpinnerButton from './spinner-button';

export default function SubmitButton({ pendingAction, submitText }) {
  return (
    <section>
      { pendingAction ?
        <SpinnerButton></SpinnerButton> :
        <button type="submit" className="standalone">{submitText}</button>
      }
    </section>
  );
}
