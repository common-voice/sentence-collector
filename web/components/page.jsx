import React from 'react';

import Header from './header';
import Footer from './footer';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <Header authed={this.props.authed} />,
      <div id="page">
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    ];
  }
}
