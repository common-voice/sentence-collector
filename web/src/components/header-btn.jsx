import React from 'react';

export default class HeaderBtn extends React.Component {
  render() {
    if (this.props.isOpen) {
      return (
        <button className="header-btn header-btn-open" onClick={this.props.handleClick.bind(this)}>
          <div className={this.props.arrow}></div>
          <div></div>
        </button>
      )
    }
    else {
      return (
        <button className="header-btn header-btn-closed" onClick={this.props.handleClick.bind(this)}>
          <div className={this.props.arrow}></div>
          <div></div>
        </button>
      )
    }
  }


} 