import React from 'react';

import DB from '../../shared/js/db';
import './form.css';

export default class App extends React.Component {

  async onSubmit(evt) {
    evt.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    this.db = new DB(username, password);
    const id = await this.db.getId();
    this.setState({
      id: id,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <section>
          {this.state && this.state.id ? this.state.id : 'Log in:'}
        </section>
        <section>
          <label htmlFor="username">username</label><input type="text" id="username" />
        </section>
        <section>
          <label htmlFor="password">password</label><input type="password" id="password" />
        </section>
        <section>
          <button type="submit">Submit</button>
        </section>
      </form>
    );
  }
}
