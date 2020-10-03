import React from 'react';

export default function HeaderBtn({ isOpen, handleClick }) {
  return (
    <button className={isOpen ? "header-btn header-btn-open" : "header-btn header-btn-closed"} onClick={handleClick.bind(this)}>
      <div className={isOpen ? "header-btn-arrow" : "header-btn-arrow header-btn-arrow-right"}></div>
    </button>
  );
}
