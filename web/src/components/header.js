import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import logoURL from '../../img/cv-logo-one-color-black.svg';
import '../../css/header.css';

import ProfileWidget from './profile-widget';

function NavItems({ authed, closeNavigation }) {
  return (
    <React.Fragment>
      <NavLink to="/" exact onClick={closeNavigation}>Home</NavLink>
      <NavLink to="/how-to" exact onClick={closeNavigation}>How-to</NavLink>
      <NavLink to="/add" exact key="add" onClick={closeNavigation}>Add</NavLink>
      <NavLink to="/review" key="review" onClick={closeNavigation}>Review</NavLink>
      <NavLink to="/rejected" key="rejected" onClick={closeNavigation}>Rejected Sentences</NavLink>
      <NavLink to="/stats" key="stats" onClick={closeNavigation}>Statistics</NavLink>
      { authed && (
        <NavLink to="/profile" exact key="profile" onClick={closeNavigation}>Profile</NavLink>
      )}
    </React.Fragment>
  );
}

export default function Header() {
  const { authed } = useSelector((state) => state.login);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const toggleMobileNav = () => {
    const newState = !showMobileNav;
    setShowMobileNav(newState);
  };

  const closeMobileNavigation = () => setShowMobileNav(false);

  return (
    <React.Fragment>
      <header>
        <Link to="/" href=""><img src={logoURL} /></Link>
        <nav id="desktopNav">
          <NavItems authed={authed} closeNavigation={closeMobileNavigation}/>
          <ProfileWidget authed={authed}/>
        </nav>

        <div id="hamburgerIcon">
          <label htmlFor="hamburger">&#9776;</label>
          <input type="checkbox" id="hamburger" onChange={toggleMobileNav}/>
        </div>
      </header>

      <section id="mobileNav" className={showMobileNav ? 'shown' : 'hidden'}>
        <NavItems authed={authed} closeNavigation={closeMobileNavigation}/>
        <ProfileWidget authed={authed}/>
      </section>
    </React.Fragment>
  );
}
