import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  login,
  logout,
  checkLoginInput,
} from '../../actions/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.state = {};
  }

  async tryAuth(username, password) {
    await this.props.login(username, password);
  }

  onSubmit(evt) {
    evt.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    this.tryAuth(username, password);
  }

  checkInput() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    this.props.checkLoginInput(username, password);
  }

  render() {
    // If we are authed either return to last page or go to profile.
    if (this.props.authed) {
      const locState = this.props.location.state || {};
      const from = locState.from || { pathname: '/profile' };
      return <Redirect to={from} />;
    }

    return (
      <form id="login" onSubmit={this.onSubmit}>
        <h2>Log in</h2>
        <p>Choose your username and password to sign up. If you already have a username, please sign in with the existing password. This login is separate from the main Common Voice site.</p>
        <section className="form-message">{this.props.errorMessage}</section>
        <section>
          <label htmlFor="username">username (alphanumeric, no email)</label>
          <input type="text" id="username" onChange={this.checkInput} disabled={this.props.pending} />
          <label htmlFor="password">password</label>
          <input type="password" id="password" onChange={this.checkInput} disabled={this.props.pending} />
          <button disabled={this.props.pending || this.props.loginDisabled}>Submit</button>
        </section>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    authed: state.login.authed,
    username: state.login.username,
    errorMessage: state.login.errorMessage,
    loginDisabled: state.login.loginDisabled,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: async (username, password) => {
      return dispatch(login(username, password));
    },
    logout: () => dispatch(logout()),
    checkLoginInput: (username, password) => dispatch(checkLoginInput(username, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
