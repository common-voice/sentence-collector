import React from 'react';

import SpinnerButton from './spinner-button';

type Props = {
  pendingAction: boolean;
  submitText: string;
};

export default function SubmitButton({ pendingAction, submitText }: Props) {
  return (
    <section>
      {pendingAction ? (
        <SpinnerButton></SpinnerButton>
      ) : (
        <button type="submit" className="standalone">
          {submitText}
        </button>
      )}
    </section>
  );
}
