import React from 'react';

import './form.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    this.props.onSubmit && this.props.onSubmit(username, password);
  }

  onLogout(evt) {
    evt.preventDefault();
    this.props.onLogout && this.props.onLogout();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Log in</h2>
        <section>
          {this.props.authed ? 'Authed!' : 'Log in:'}
        </section>
          <section>
          {this.props.message && (
            <p id="form-message">{this.props.message}</p>
          )}
          </section>
          {!this.props.authed ? (
            <section>
              <label htmlFor="username">username</label><input type="text" id="username" />
              <label htmlFor="password">password</label><input type="password" id="password" />
              <button>Submit</button>
            </section>
          ) : (
            <section>
              <button onClick={this.onLogout}>Logout</button>
            </section>
          )}
      </form>
    );
  }
}
