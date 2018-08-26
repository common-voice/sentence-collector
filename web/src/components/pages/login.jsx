import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import DB from '../../../../shared/db';
import {
  login,
  logout,
  setPending,
  isLoggedIn,
  isPending
} from '../../actions';
import { getDatabaseUrl } from '../../config';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {};
  }

  async tryAuth(username, password) {
    this.props.dispatch(setPending());
    this.db = new DB(getDatabaseUrl(), username, password);
    const authed = await this.db.auth();
    const message = authed ? 'hello' : 'Login failed';

    this.setState({
      message: message,
    });

    if (authed) {
      this.props.dispatch(login(username));
    } else {
      this.props.dispatch(logout());
    }
  }

  async onLogout(evt) {
    evt.preventDefault();
    this.props.dispatch(logout());
    this.setState({
      message: 'Logged out.',
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    this.tryAuth(username, password);
  }

  render() {
    // If we are authed either return to last page or go to profile.
    if (isLoggedIn(this.props.auth)) {
      const locState = this.props.location.state || {}
      const from = locState.from || { pathname: '/profile' };
      return <Redirect to={from} />;
    }

    let pending = isPending(this.props.auth);
    return (
      <form id="login" onSubmit={this.onSubmit}>
        <h2>Log in</h2>
        <section id="form-message">{this.state.message}</section>
        <section>
          <label htmlFor="username">username</label>
          <input type="text" id="username" disabled={pending} />
          <label htmlFor="password">password</label>
          <input type="password" id="password" disabled={pending} />
          <button disabled={pending}>Submit</button>
        </section>
      </form>
    );
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    username: state.username,
  };
})(Form);
