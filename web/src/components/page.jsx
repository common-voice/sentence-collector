import React from 'react';

import Header from '../containers/header';
import Footer from './footer';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <Header key="header" />,
      <div id="page" key="page">
        <main key="main">
          {this.props.children}
        </main>
        <Footer key="footer"/>
      </div>
    ];
  }
}
