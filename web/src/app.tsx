import React, { useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
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
import PageContainer from './components/page';
import Profile from './components/profile';
import RejectedSentences from './components/rejected-sentences-list';
import Review from './components/review';
import Stats from './components/stats';
import { AppLocalizationProvider } from './l10n';

export default function App({ history }: { history: History }) {
  const { authed } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCurrentUser());
    dispatch(getLanguages());
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        {/* Redirects to EN as default language */}
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
        <Route exact path="/profile" render={() => <Redirect to={{ pathname: '/en/profile' }} />} />
        <Route exact path="/add" render={() => <Redirect to={{ pathname: '/en/add' }} />} />
        <Route exact path="/review" render={() => <Redirect to={{ pathname: '/en/review' }} />} />
        <Route
          path="/review/:language"
          render={() => <Redirect to={{ pathname: '/en/review/:language' }} />}
        />
        <Route path="/rejected" render={() => <Redirect to={{ pathname: '/en/rejected' }} />} />
        <Route path="/sentences" render={() => <Redirect to={{ pathname: '/en/sentences' }} />} />
        <Route path="/stats" render={() => <Redirect to={{ pathname: '/en/stats' }} />} />

        {/* Routes with integrated locale parameter */}
        <Route
          exact
          path="/:locale/"
          render={() => (
            <Page>
              <Home />
            </Page>
          )}
        />
        <Route
          exact
          path="/:locale/how-to"
          render={() => (
            <Page>
              <HowTo />
            </Page>
          )}
        />
        <Route
          exact
          path="/:locale/login-failure"
          render={() => (
            <Page>
              <LoginFailure />
            </Page>
          )}
        />
        <Route
          exact
          path="/:locale/login-success"
          render={() => (
            <Page>
              <LoginSuccess />
            </Page>
          )}
        />
        <Route
          exact
          path="/:locale/logout-success"
          render={() => (
            <Page>
              <LogoutSuccess />
            </Page>
          )}
        />
        <PrivateRoute
          exact
          authed={authed}
          path="/:locale/profile"
          render={() => (
            <Page>
              <Profile />
            </Page>
          )}
        />
        <PrivateRoute
          exact
          authed={authed}
          path="/:locale/add"
          render={() => (
            <Page>
              <Add />
            </Page>
          )}
        />
        <PrivateRoute
          exact
          authed={authed}
          path="/:locale/review"
          render={() => (
            <Page>
              <Review />
            </Page>
          )}
        />
        <PrivateRoute
          authed={authed}
          path="/:locale/review/:language"
          render={() => (
            <Page>
              <Review />
            </Page>
          )}
        />
        <PrivateRoute
          authed={authed}
          path="/:locale/rejected"
          render={() => (
            <Page>
              <RejectedSentences />
            </Page>
          )}
        />
        <PrivateRoute
          authed={authed}
          path="/:locale/sentences"
          render={() => (
            <Page>
              <MySentences />
            </Page>
          )}
        />
        <PrivateRoute
          authed={authed}
          path="/:locale/stats"
          render={() => (
            <Page>
              <Stats />
            </Page>
          )}
        />

        <Route render={() => <Redirect to={{ pathname: '/en' }} />} />
      </Switch>
    </ConnectedRouter>
  );
}

type PrivateRouteProps = {
  authed: boolean;
  path: string;
  render: React.JSXElementConstructor<any>;
  exact?: boolean;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const { authed, render: Component } = props;
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

const Page = ({ children }: { children: ReactNode }) => {
  const match = useRouteMatch<{ locale: string }>();
  const locale = match?.params?.locale;

  return (
    <AppLocalizationProvider locale={locale}>
      <PageContainer>{children}</PageContainer>
    </AppLocalizationProvider>
  );
};
