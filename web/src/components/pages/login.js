import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  afterLogin,
  logout,
} from '../../actions/login';

function LoginSuccessComponent({ afterLogin }) {
  afterLogin();

  return (
    <Redirect to={'/profile'} />
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    afterLogin: () => dispatch(afterLogin()),
    logout: () => dispatch(logout()),
  };
}

export const LoginSuccess = connect(mapStateToProps, mapDispatchToProps)(LoginSuccessComponent);

function LoginFailureComponent({ logout }) {
  logout();

  return (
    <section>
      <h1>Login failed</h1>
      <p>Please try again.</p>
    </section>
  );
}

export const LoginFailure = connect(mapStateToProps, mapDispatchToProps)(LoginFailureComponent);

export function LogoutSuccessComponent({ logout }) {
  logout();

  return (
    <Redirect to={'/'} />
  );
}

export const LogoutSuccess = connect(mapStateToProps, mapDispatchToProps)(LogoutSuccessComponent);
