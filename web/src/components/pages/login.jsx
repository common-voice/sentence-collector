import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {};
  }

  async tryAuth(username, password) {
    try {
      await this.props.login(username, password);
    } catch (err) {
      document.getElementById('password').value = '';
      this.setState({ message: 'Login failed: ' + err });
    }
  }

  onSubmit(evt) {
    evt.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    this.tryAuth(username, password);
  }

  render() {
    // If we are authed either return to last page or go to profile.
    if (this.props.authed) {
      const locState = this.props.location.state || {}
      const from = locState.from || { pathname: '/profile' };
      return <Redirect to={from} />;
    }

    return (
      <form id="login" onSubmit={this.onSubmit}>
        <h2>Log in</h2>
        <p>Choose your username and password to sign up. If you already have a username, please sign in with the existing password. Please only use alphanumeric usernames.</p>
        <section className="form-message">{this.state.message}</section>
        <section>
          <label htmlFor="username">username</label>
          <input type="text" id="username" disabled={this.props.pending} />
          <label htmlFor="password">password</label>
          <input type="password" id="password" disabled={this.props.pending} />
          <button disabled={this.props.pending}>Submit</button>
        </section>
      </form>
    );
  }
}
