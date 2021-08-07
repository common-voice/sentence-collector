import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
      <h1>Login failed</h1>
      <p>Please try again.</p>
    </section>
  );
}

export function LogoutSuccess() {
  const dispatch = useDispatch();
  dispatch(logout());

  return <Redirect to={'/'} />;
}
