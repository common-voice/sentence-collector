// LOCALIZATION VERSION
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Localized } from '@fluent/react';

import { afterLogin, logout } from '../actions/login';

export function LoginSuccess() {
  const dispatch = useDispatch();
  dispatch(afterLogin());

  return <Redirect to={'/profile'} />;
}

export function LoginFailure() {
  const dispatch = useDispatch();
  dispatch(logout());

  return (
    <section>
      <Localized id="sc-login-err-failed">
        <h1>Login failed</h1>
      </Localized>
      <Localized id="sc-login-err-try-again">
        <p>Please try again.</p>
      </Localized>
    </section>
  );
}

export function LogoutSuccess() {
  const dispatch = useDispatch();
  dispatch(logout());

  return <Redirect to={'/'} />;
}
