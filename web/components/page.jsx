import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logoURL from '../img/white-mozilla.svg';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return [
      <header>
        <Link to="/" href=""><img src={logoURL}/></Link>
        <nav>
          <NavLink to="/" exact="true">Home</NavLink>
          <NavLink to="/how-to" exact="true">How-to</NavLink>
          <NavLink to="/add" exact="true">add</NavLink>
          <NavLink to="/profile" exact="true">Profile</NavLink>
        </nav>
      </header>,
      <div id="page">

        <main>
          {this.props.children}
        </main>
        <footer>Footer</footer>
      </div>
    ];
  }
}
