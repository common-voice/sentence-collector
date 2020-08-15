import React from 'react';

const HeaderBtn = (props) => {
  return (
    <button className={props.isOpen ? "header-btn header-btn-open" : "header-btn header-btn-closed"} onClick={props.handleClick.bind(this)}>
      <div className={props.isOpen ? "header-btn-arrow" : "header-btn-arrow header-btn-arrow-right"}></div>
    </button>
  );
};

export default HeaderBtn;
