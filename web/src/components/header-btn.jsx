import React from 'react';

export default class HeaderBtn extends React.Component {
  
  render() {
      return (
        <button className={this.props.isOpen ? "header-btn header-btn-open" : "header-btn header-btn-closed"} onClick={this.props.handleClick.bind(this)}>
          <div className={this.props.arrow}></div>
        </button>
      )
    }
  }
