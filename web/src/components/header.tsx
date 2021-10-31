import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Localized } from '@fluent/react';

import logoURL from '../../img/cv-logo-one-color-black.svg';
import '../../css/header.css';

import type { RootState } from '../types';
import LoginButton from './login-button';

type Props = {
  authed: boolean;
  closeNavigation: () => void;
};

function NavItems({ authed, closeNavigation }: Props) {
  return (
    <React.Fragment>
      <NavLink to="/" exact onClick={closeNavigation}>
        <Localized id="sc-header-home">Home</Localized>
      </NavLink>
      <NavLink to="/how-to" exact onClick={closeNavigation}>
        <Localized id="sc-header-how-to">How-to</Localized>
      </NavLink>
      <NavLink to="/add" exact key="add" onClick={closeNavigation}>
        <Localized id="sc-header-add">Add</Localized>
      </NavLink>
      <NavLink to="/review" key="review" onClick={closeNavigation}>
        <Localized id="sc-header-review">Review</Localized>
      </NavLink>
      <NavLink to="/rejected" key="rejected" onClick={closeNavigation}>
        <Localized id="sc-header-rejected">Rejected Sentences</Localized>
      </NavLink>
      <NavLink to="/sentences" key="sentences" onClick={closeNavigation}>
        <Localized id="sc-header-my">My Sentences</Localized>
      </NavLink>
      <NavLink to="/stats" key="stats" onClick={closeNavigation}>
        <Localized id="sc-header-statistics">Statistics</Localized>
      </NavLink>
      {authed && (
        <NavLink to="/profile" exact key="profile" onClick={closeNavigation}>
          <Localized id="sc-header-profile">Profile</Localized>
        </NavLink>
      )}
    </React.Fragment>
  );
}

export default function Header() {
  const { authed } = useSelector((state: RootState) => state.login);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const toggleMobileNav = () => {
    const newState = !showMobileNav;
    setShowMobileNav(newState);
  };

  const closeMobileNavigation = () => setShowMobileNav(false);

  return (
    <React.Fragment>
      <header>
        <Link to="/" href="">
          <img src={logoURL} />
        </Link>
        <nav id="desktopNav">
          <NavItems authed={authed} closeNavigation={closeMobileNavigation} />
          <LoginButton authed={authed} />
        </nav>

        <div id="hamburgerIcon">
          <label htmlFor="hamburger">&#9776;</label>
          <input type="checkbox" id="hamburger" onChange={toggleMobileNav} />
        </div>
      </header>

      <section id="mobileNav" className={showMobileNav ? 'shown' : 'hidden'}>
        <NavItems authed={authed} closeNavigation={closeMobileNavigation} />
        <LoginButton authed={authed} />
      </section>
    </React.Fragment>
  );
}
