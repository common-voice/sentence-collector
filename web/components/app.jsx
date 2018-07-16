import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

import Page from './page';
import Home from './pages/home';
import HowTo from './pages/how-to';
import Login from './pages/login';
import Profile from './pages/profile';
import Add from './pages/add';
import DB from '../../shared/js/db';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.tryAuth = this.tryAuth.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidCatch(error, info) {
    console.error('Main app component error', error, info);
  }

  async tryAuth(username: string, password: string) {
    this.db = new DB(username, password);
    const authed = await this.db.auth();
    const message = authed ? 'hello' : 'Login failed';
    this.setState({
      authed: authed,
      message: message,
    });
  }

  async onLogout() {
    this.setState({
      authed: false,
      message: '',
    });
  }

  render() {
    return <Router>
      <Page>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/how-to" component={HowTo} />
          <Route exact path="/login" render={props => (
            <Login authed={this.state.authed} message={this.state.message}
              onLogin={this.tryAuth} onLogout={this.onLogout} />
          )} />
          <PrivateRoute authed={this.state.authed}
            path="/profile" component={Profile} />
          <PrivateRoute authed={this.state.authed}
            path="/add" component={Add} />
        </Switch>
      </Page>
    </Router>;
  }
}

const PrivateRoute = (props) => {
  const Component = props.component;
  const authed = props.authed;
  return <Route
    path={props.path}
    render={props =>
      authed ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />;
}
