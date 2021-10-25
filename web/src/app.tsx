import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import type { History } from 'history';
import { getLanguages } from './actions/languages';
import { checkCurrentUser } from './actions/login';
import type { RootState } from './types';

import Add from './components/add';
import Home from './components/home';
import HowTo from './components/how-to';
import { LoginSuccess, LoginFailure, LogoutSuccess } from './components/login';
import MySentences from './components/my-sentences-list';
import Page from './components/page';
import Profile from './components/profile';
import RejectedSentences from './components/rejected-sentences-list';
import Review from './components/review';
import Stats from './components/stats';

export default function App({ history }: { history: History }) {
  const { authed } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCurrentUser());
    dispatch(getLanguages());
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Page>
        <Switch>
          <Route exact path="/" render={() => <Redirect to={{ pathname: '/en' }} />} />
          <Route exact path="/how-to" render={() => <Redirect to={{ pathname: '/en/how-to' }} />} />
          <Route
            exact
            path="/login-failure"
            render={() => <Redirect to={{ pathname: '/en/login-failure' }} />}
          />
          <Route
            exact
            path="/login-success"
            render={() => <Redirect to={{ pathname: '/en/login-success' }} />}
          />
          <Route
            exact
            path="/logout-success"
            render={() => <Redirect to={{ pathname: '/en/logout-success' }} />}
          />
          <Route
            exact
            path="/profile"
            render={() => <Redirect to={{ pathname: '/en/profile' }} />}
          />
          <Route exact path="/add" render={() => <Redirect to={{ pathname: '/en/add' }} />} />
          <Route exact path="/review" render={() => <Redirect to={{ pathname: '/en/review' }} />} />
          <Route
            path="/review/:language"
            render={() => <Redirect to={{ pathname: '/en/review/:language' }} />}
          />
          <Route path="/rejected" render={() => <Redirect to={{ pathname: '/en/rejected' }} />} />
          <Route path="/sentences" render={() => <Redirect to={{ pathname: '/en/sentences' }} />} />
          <Route path="/stats" render={() => <Redirect to={{ pathname: '/en/stats' }} />} />

          <Route exact path="/:locale/" component={Home} />
          <Route exact path="/:locale/how-to" component={HowTo} />
          <Route exact path="/:locale/login-failure" component={LoginFailure} />
          <Route exact path="/:locale/login-success" component={LoginSuccess} />
          <Route exact path="/:locale/logout-success" component={LogoutSuccess} />
          <PrivateRoute exact authed={authed} path="/:locale/profile" component={Profile} />
          <PrivateRoute exact authed={authed} path="/:locale/add" component={Add} />
          <PrivateRoute exact authed={authed} path="/:locale/review" component={Review} />
          <PrivateRoute authed={authed} path="/:locale/review/:language" component={Review} />
          <PrivateRoute authed={authed} path="/:locale/rejected" component={RejectedSentences} />
          <PrivateRoute authed={authed} path="/:locale/sentences" component={MySentences} />
          <PrivateRoute authed={authed} path="/:locale/stats" component={Stats} />

          <Route render={() => <Redirect to={{ pathname: '/en' }} />} />
        </Switch>
      </Page>
    </ConnectedRouter>
  );
}

type PrivateRouteProps = {
  authed: boolean;
  path: string;
  component: React.JSXElementConstructor<any>;
  exact?: boolean;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const { authed, component: Component } = props;
  return (
    <Route
      path={props.path}
      render={(props) => {
        if (authed) {
          return <Component {...props} />;
        }

        window.location.href = '/sentence-collector/login';
        return;
      }}
    />
  );
};
