import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import ProfileWidget from '../containers/profile-widget';
import logoURL from '../../img/white-mozilla.svg';

const Header = (props) => {
  return <header>
    <Link to="/" href=""><img src={logoURL}/></Link>
    <nav>
      <NavLink to="/" exact>Home</NavLink>
      <NavLink to="/how-to" exact>How-to</NavLink>
      <NavLink to="/add" exact key="add">Add</NavLink>
      <NavLink to="/review" key="review">Review</NavLink>
      { props.authed ? (
        <NavLink to="/profile" exact key="profile">Profile</NavLink>
      ) : (
        <NavLink to="/login" exact>Login</NavLink>
      )}
    </nav>
    <ProfileWidget />
  </header>;
};

export default Header;
