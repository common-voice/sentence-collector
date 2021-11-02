import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Localized } from '@fluent/react';

import logoURL from '../../img/cv-logo-one-color-black.svg';
import '../../css/header.css';

import { useLocaleUrl } from '../urls';
import type { RootState } from '../types';
import LoginButton from './login-button';

type Props = {
  authed: boolean;
  closeNavigation: () => void;
};

function NavItems({ authed, closeNavigation }: Props) {
  // As the profile link is conditionally rendered we need to always use
  // the hook first, as otherwise not all hooks will be rendered at all times.
  const localizedProfileUrl = useLocaleUrl('/profile');

  return (
    <React.Fragment>
      <NavLink to={useLocaleUrl('/')} exact onClick={closeNavigation}>
        <Localized id="sc-header-home" />
      </NavLink>
      <NavLink to={useLocaleUrl('/how-to')} exact onClick={closeNavigation}>
        <Localized id="sc-header-how-to" />
      </NavLink>
      <NavLink to={useLocaleUrl('/add')} exact key="add" onClick={closeNavigation}>
        <Localized id="sc-header-add" />
      </NavLink>
      <NavLink to={useLocaleUrl('/review')} key="review" onClick={closeNavigation}>
        <Localized id="sc-header-review" />
      </NavLink>
      <NavLink to={useLocaleUrl('/rejected')} key="rejected" onClick={closeNavigation}>
        <Localized id="sc-header-rejected" />
      </NavLink>
      <NavLink to={useLocaleUrl('/sentences')} key="sentences" onClick={closeNavigation}>
        <Localized id="sc-header-my" />
      </NavLink>
      <NavLink to={useLocaleUrl('/stats')} key="stats" onClick={closeNavigation}>
        <Localized id="sc-header-statistics" />
      </NavLink>
      {authed && (
        <NavLink to={localizedProfileUrl} exact key="profile" onClick={closeNavigation}>
          <Localized id="sc-header-profile" />
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
