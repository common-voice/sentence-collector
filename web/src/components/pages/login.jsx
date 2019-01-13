import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
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

  checkUsername() {
    const username = document.getElementById('username').value;
    this.props.checkUsername(username);
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
        <p>Choose your username and password to sign up. If you already have a username, please sign in with the existing password.</p>
        <section className="form-message">{this.props.errorMessage}</section>
        <section>
          <label htmlFor="username">username (alphanumeric, no email)</label>
          <input type="text" id="username" onChange={this.checkUsername} disabled={this.props.pending} />
          <label htmlFor="password">password</label>
          <input type="password" id="password" disabled={this.props.pending} />
          <button disabled={this.props.pending || this.props.errorMessage}>Submit</button>
        </section>
      </form>
    );
  }
}
