import React from 'react';

import Header from '../containers/header';
import HeaderBtn from './header-btn';

let DEFAULT_STATE = {
  headerIsOpen: true,
}

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => {
      return { headerIsOpen: !prevState.headerIsOpen }
    });
  }

  render() {
    if (this.state.headerIsOpen) {
      return [
        <Header key="header" />,
        <div id="page" key="page">
          <HeaderBtn arrow="header-btn-arrow-left" isOpen={this.state.headerIsOpen} handleClick={this.handleClick} />
          <main key="main">
            {this.props.children}
          </main>
        </div>
      ];

    } else {
      return [
        <div id="page" key="page">
          <HeaderBtn arrow="header-btn-arrow-right" handleClick={this.handleClick} />
          <main key="main">
            {this.props.children}
          </main>
        </div>
      ];
    }
  }
}