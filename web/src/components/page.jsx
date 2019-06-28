import React from 'react';

import Header from '../containers/header';
import Notice from './notice';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <Header key="header" />,
      <div id="page" key="page">
        <main key="main">
          <Notice text="We're currently experiences issues with the backend which leads to this website not being able to connect to the database. New sentences can't be added as well as reviews and statistics do not work. We are working on the issue and will remove this notice once everything is back to normal." />
          {this.props.children}
        </main>
      </div>
    ];
  }
}
