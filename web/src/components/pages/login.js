import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  fetchAfterLogin,
  logout,
} from '../../actions/login';

function LoginSuccessComponent({ fetchAfterLogin }) {
  fetchAfterLogin();

  return (
    <Redirect to={'/profile'} />
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAfterLogin: () => dispatch(fetchAfterLogin()),
    logout: () => dispatch(logout()),
  };
}

export const LoginSuccess = connect(mapStateToProps, mapDispatchToProps)(LoginSuccessComponent);

export function LoginFailure() {
  return (
    <section>
      <h1>Login failed</h1>
      <p>Please try again.</p>
    </section>
  );
}

export function LogoutSuccessComponent({ logout }) {
  logout();

  return (
    <Redirect to={'/'} />
  );
}

export const LogoutSuccess = connect(mapStateToProps, mapDispatchToProps)(LogoutSuccessComponent);
