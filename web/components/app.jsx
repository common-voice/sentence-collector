import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';

import Page from './page';
import Home from './pages/home';
import HowTo from './pages/how-to';
import Form from './pages/form';
import Profile from './pages/profile';
import Add from './pages/add';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, info) {
    console.error('Main app component error', error, info);
  }

  render() {
    return (
      <Router>
        <Page authed={this.props.authed}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/how-to" component={HowTo} />
            <Route exact path="/login" component={Form} />
            <PrivateRoute authed={this.props.authed}
              path="/profile" component={Profile} />
            <PrivateRoute authed={this.props.authed}
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

export default connect(state => {
  return {
    authed: state.authed
  };
})(App);
