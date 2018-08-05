import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ProfileWidget from './profile-widget';
import { isLoggedIn } from '../store/actions';
import logoURL from '../img/white-mozilla.svg';

const Header = (props) => {
  let authed = isLoggedIn(props.auth);
  return <header>
    <Link to="/" href=""><img src={logoURL}/></Link>
    <nav>
      <NavLink to="/" exact={true}>Home</NavLink>
      <NavLink to="/how-to" exact={true}>How-to</NavLink>
      { authed ? [
        <NavLink to="/add" exact={true} key="add">add</NavLink>,
        <NavLink to="/profile" exact={true} key="profile">Profile</NavLink>,
      ] : (
        <NavLink to="/login" exact={true}>Login</NavLink>
      )}
    </nav>
    <ProfileWidget />
  </header>;
}

export default withRouter(connect(state => {
  return {
    auth: state.auth
  };
})(Header));
