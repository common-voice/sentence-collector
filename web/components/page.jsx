import React from 'react';

import Header from './header';
import Footer from './footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <Header />,
      <div id="page">
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    ];
  }
}
