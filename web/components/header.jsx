import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import ProfileWidget from './profile-widget';
import logoURL from '../img/white-mozilla.svg';

const Header = (props) => (
  <header>
    <Link to="/" href=""><img src={logoURL}/></Link>
    <nav>
      <NavLink to="/" exact={true}>Home</NavLink>
      <NavLink to="/how-to" exact={true}>How-to</NavLink>
      <NavLink to="/add" exact={true}>add</NavLink>
      <NavLink to="/profile" exact={true}>Profile</NavLink>
    </nav>
    <ProfileWidget authed={props.authed} />
  </header>
);

export default Header;
