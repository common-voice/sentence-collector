import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import logoURL from '../../img/cv-logo-one-color-black.svg';
import '../../css/header.css';

import ProfileWidget from './profile-widget';

function NavItems({ authed }) {
  return (
    <React.Fragment>
      <NavLink to="/" exact>Home</NavLink>
      <NavLink to="/how-to" exact>How-to</NavLink>
      <NavLink to="/add" exact key="add">Add</NavLink>
      <NavLink to="/review" key="review">Review</NavLink>
      <NavLink to="/rejected" key="rejected">Rejected Sentences</NavLink>
      <NavLink to="/stats" key="stats">Statistics</NavLink>
      { authed && (
        <NavLink to="/profile" exact key="profile">Profile</NavLink>
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

  return (
    <React.Fragment>
      <header>
        <Link to="/" href=""><img src={logoURL} /></Link>
        <nav id="desktopNav">
          <NavItems authed={authed}/>
          <ProfileWidget authed={authed}/>
        </nav>

        <div id="hamburgerIcon">
          <label htmlFor="hamburger">&#9776;</label>
          <input type="checkbox" id="hamburger" onChange={toggleMobileNav}/>
        </div>
      </header>

      <section id="mobileNav" className={showMobileNav ? 'shown' : 'hidden'}>
        <NavItems authed={authed}/>
        <ProfileWidget authed={authed}/>
      </section>
    </React.Fragment>
  );
}
