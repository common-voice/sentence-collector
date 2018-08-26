import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

import { isLoggedIn } from '../actions';
import Page from './page';
import Home from './pages/home';
import HowTo from './pages/how-to';
import Login from '../containers/login';
import Profile from './pages/profile';
import Add from './pages/add';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, info) {
    console.error('Main app component error', error, info);
  }

  render() {
    let authed = isLoggedIn(this.props.auth);
    return (
      <Router>
        <Page>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/how-to" component={HowTo} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute authed={authed}
              path="/profile" component={Profile} />
            <PrivateRoute authed={authed}
              path="/add" component={Add} />
          </Switch>
        </Page>
      </Router>
    );
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
