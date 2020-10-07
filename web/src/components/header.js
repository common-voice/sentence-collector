import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import ProfileWidget from './profile-widget';
import logoURL from '../../img/cv-logo-one-color-white.svg';

export default function Header() {
  const { authed, migrationDone } = useSelector((state) => state.login);

  return (
    <header>
      <Link to="/" href=""><img src={logoURL} /></Link>
      <nav>
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/how-to" exact>How-to</NavLink>
        <NavLink to="/add" exact key="add">Add</NavLink>
        <NavLink to="/review" key="review">Review</NavLink>
        <NavLink to="/rejected" key="rejected">Rejected Sentences</NavLink>
        <NavLink to="/stats" key="stats">Statistics</NavLink>
        { authed ? (
          <NavLink to="/profile" exact key="profile">Profile</NavLink>
        ) : (
          <a href="/sentence-collector/login">Login</a>
        )}
        { authed && !migrationDone && (
          <NavLink to="/migrate" exact key="migrate">Migrate Account</NavLink>
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
}
