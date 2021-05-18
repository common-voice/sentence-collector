import React from 'react';

import '../../css/spinner-button.css';

export default function SpinnerButton() {
  return (
    <button className="spinnerButton spinning" disabled={true}>Submitting...</button>
  );
}
