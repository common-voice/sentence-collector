import React from 'react';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/how-to">How-to</Link>
          <Link to="/add">add</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>,
      <main>{this.props.children}</main>,
      <footer>Footer</footer>
    ];
  }
}
