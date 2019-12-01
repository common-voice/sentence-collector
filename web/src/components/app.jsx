import React from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Page from './page';
import Home from './pages/home';
import HowTo from './pages/how-to';
import Login from './pages/login';
import Profile from './pages/profile';
import Rejected from './pages/rejected';
import Add from './pages/add.jsx';
import Review from './pages/review';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Page>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/how-to" component={HowTo} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact authed={this.props.authed}
              path="/profile" component={Profile} />
            <PrivateRoute exact authed={this.props.authed}
              path="/add" component={Add} />
            <PrivateRoute exact authed={this.props.authed}
              path="/review" component={Review} />
            <PrivateRoute authed={this.props.authed}
              path="/review/:language" component={Review} />
            <PrivateRoute authed={this.props.authed}
              path="/rejected" component={Rejected} />
            <Route render={() => (
              <Redirect
                to={{
                  pathname: "/",
                }}
              />
            )} />
          </Switch>
        </Page>
      </ConnectedRouter>
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

function mapStateToProps(state) {
  return {
    authed: state.app.authed,
  };
}

export default connect(mapStateToProps)(App);
