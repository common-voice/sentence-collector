import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import ProfileWidget from '../containers/profile-widget';
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
        {props.authed ? (
        { props.authed ? (
          <NavLink to="/profile" exact key="profile">Profile</NavLink>
        ) : (
            <NavLink to="/login" exact>Login</NavLink>
          )}
      </nav>
      <ProfileWidget />
      <section id="external-links">
        <a target="_blank" rel="noopener" href="https://discourse.mozilla.org/tags/c/voice/sentence-collection">Discourse</a>
        <a target="_blank" rel="noopener" href="https://github.com/Common-Voice/sentence-collector/issues">Report Bugs (GitHub)</a>
        <a target="_blank" rel="noopener" href="https://voice.mozilla.org/en/privacy">Privacy</a>
        <a target="_blank" rel="noopener" href="https://voice.mozilla.org/en/terms">Terms</a>
        <a target="_blank" rel="noopener" href="https://www.mozilla.org/en-US/privacy/websites/#cookies">Cookies</a>
      </section>
    </header>
  );
};

export default Header;