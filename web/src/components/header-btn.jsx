import React from 'react';

const HeaderBtn = (props) => {
  return (
    <button id="header-btn" onClick={props.handleClick.bind(this)}>
      <div className={props.arrow}></div>
    </button>
  );
}

export default HeaderBtn;