import React from 'react';

import Header from './header';
import HeaderBtn from './header-btn';

const DEFAULT_STATE = {
  headerIsOpen: true,
};

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => {
      return { headerIsOpen: !prevState.headerIsOpen };
    });
  }

  render() {
    if (this.state.headerIsOpen) {
      return [
        <Header key="header" />,
        <div id="page" key="page">
          <HeaderBtn isOpen={this.state.headerIsOpen} handleClick={this.handleClick} />
          <main key="main">
            {this.props.children}
          </main>
        </div>
      ];

    } else {
      return [
        <div id="page" key="page">
          <HeaderBtn handleClick={this.handleClick} />
          <main key="main">
            {this.props.children}
          </main>
        </div>
      ];
    }
  }
}