import React, { useEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { getLanguages } from '../actions/languages';
import { checkCurrentUser } from '../actions/login';

import Page from './page';
import Home from '../containers/home';
import HowTo from '../containers/how-to';
import { LoginSuccess, LoginFailure, LogoutSuccess } from '../containers/login';
import Profile from '../containers/profile';
import Rejected from '../containers/rejected';
import Add from '../containers/add';
import Review from '../containers/review';
import Stats from '../containers/stats';

export default function App({ history }) {
  const {
    authed,
  } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCurrentUser());
    dispatch(getLanguages());
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Page>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/how-to" component={HowTo} />
          <Route exact path="/login-failure" component={LoginFailure} />
          <Route exact path="/login-success" component={LoginSuccess} />
          <Route exact path="/logout-success" component={LogoutSuccess} />
          <PrivateRoute exact authed={authed} path="/profile" component={Profile} />
          <PrivateRoute exact authed={authed} path="/add" component={Add} />
          <PrivateRoute exact authed={authed} path="/review" component={Review} />
          <PrivateRoute authed={authed} path="/review/:language" component={Review} />
          <PrivateRoute authed={authed} path="/rejected" component={Rejected} />
          <PrivateRoute authed={authed} path="/stats" component={Stats} />
          <Route render={() => (
            <Redirect to={{ pathname: "/", }} />
          )} />
        </Switch>
      </Page>
    </ConnectedRouter>
  );
}

const PrivateRoute = (props) => {
  const { authed, component: Component } = props;
  return <Route
    path={props.path}
    render={props => {
      if (authed) {
        return <Component {...props} />;
      }

      window.location = '/sentence-collector/login';
      return;
    }}
  />;
};
