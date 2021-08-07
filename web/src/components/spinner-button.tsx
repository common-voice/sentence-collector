import React from 'react';

import '../../css/spinner-button.css';

export default function SpinnerButton({ text = 'Submitting...' }) {
  return (
    <button className="spinnerButton spinning" disabled={true}>
      {text}
    </button>
  );
}
