import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import ProfileWidget from './profile-widget';
import logoURL from '../../img/cv-logo-one-color-white.svg';

const Header = (props) => {
  return (
    <header>
      <Link to="/" href=""><img src={logoURL} /></Link>
      <nav>
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/how-to" exact>How-to</NavLink>
        <NavLink to="/add" exact key="add">Add</NavLink>
        <NavLink to="/review" key="review">Review</NavLink>
        <NavLink to="/rejected" key="rejected">Rejected Sentences</NavLink>
        { props.authed ? (
          <NavLink to="/profile" exact key="profile">Profile</NavLink>
        ) : (
          <a href="/sentence-collector/login">Login</a>
        )}
      </nav>
      <ProfileWidget />
      <section id="external-links">
        <a target="_blank" rel="noopener noreferrer" href="https://discourse.mozilla.org/tags/c/voice/sentence-collection">Discourse</a>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/Common-Voice/sentence-collector/issues">Report Bugs (GitHub)</a>
        <a target="_blank" rel="noopener noreferrer" href="https://discourse.mozilla.org/t/sentence-collector-copyright-issues/52767">Report copyright issues</a>
        <a target="_blank" rel="noopener noreferrer" href="https://commonvoice.mozilla.org/privacy">Privacy</a>
        <a target="_blank" rel="noopener noreferrer" href="https://commonvoice.mozilla.org/terms">Terms</a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.mozilla.org/en-US/privacy/websites/#cookies">Cookies</a>
      </section>
    </header>
  );
};

function mapStateToProps(state) {
  return {
    // force a re-render of header active links on location change.
    location: state.router.location,
    authed: state.login.authed,
  };
}

export default connect(mapStateToProps)(Header);
