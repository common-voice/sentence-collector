import React from 'react';

import '../../css/spinner-button.css';


const SpinnerButton = () => {
  return (
    <button className="spinnerButton spinning" disabled="disabled">Submitting...</button>
  );
};

export default SpinnerButton;