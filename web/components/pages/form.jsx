import React from 'react';
import { connect } from 'react-redux';

import DB from '../../../shared/js/db';
import { ACTION_LOGIN, ACTION_LOGOUT } from '../../store';

import './form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {};
  }

  async tryAuth(username, password) {
    this.db = new DB(username, password);
    const authed = await this.db.auth();
    const message = authed ? 'hello' : 'Login failed';
    this.setState({
      message: message,
    });

    if (authed) {
      this.props.dispatch({ type: ACTION_LOGIN });
    }
  }

  async onLogout(evt) {
    evt.preventDefault();
    this.props.dispatch({ type: ACTION_LOGOUT });
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
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Log in</h2>
        <section>
          {this.props.authed ? 'Authed!' : 'Log in:'}
        </section>
          <section>
          {this.state.message && (
            <p id="form-message">{this.state.message}</p>
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

export default connect(state => {
  return {
    authed: state.authed
  };
})(Form);
