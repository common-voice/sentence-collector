'use strict';

const debug = require('debug')('sentencecollector:app');
const bodyParser = require('body-parser');
const connectSessionSequelize = require('connect-session-sequelize');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yml');

const models = require('./lib/models');
const users = require('./lib/users');
const sentencesRoutes = require('./routes/sentences');
const languagesRoutes = require('./routes/languages');
const statsRoutes = require('./routes/stats');
const usersRoutes = require('./routes/users');
const votesRoutes = require('./routes/votes');

const {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_CALLBACK_URL = 'http://localhost:3333/sentence-collector/callback',
  SESSION_SECRET,
  NODE_ENV = 'development',
  USE_SESSION_STORE = 'true',
} = process.env;

// Locally: frontend at /, API at /sentence-collector
// Production: frontend and API both at /sentence-collector
const FRONTEND_BASE_PATH = NODE_ENV === 'production' ? '/sentence-collector' : '';
const MOUNT_PATH = NODE_ENV === 'production' ? '' : '/sentence-collector';

const COOKIE_NAME = 'sc.connect.sid';
const maxAge = 30 * 24 * 60 * 60 * 1000;
const staticOptions = {
  setHeaders: (response) => {
    response.set('X-Release-Version', process.env.RELEASE_VERSION || 'unknown');
  },
};

const SequelizeStore = connectSessionSequelize(session.Store);

const app = express();
app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(require('cookie-parser')());

const sessionOptions = {
  cookie: {
    maxAge,
    secure: NODE_ENV === 'production',
  },
  name: COOKIE_NAME,
  secret: SESSION_SECRET,
  proxy: true,
  resave: false,
  saveUninitialized: false,
};

if (USE_SESSION_STORE === 'true') {
  sessionOptions.store = new SequelizeStore({
    db: models.sequelize,
    expiration: maxAge,
  });
  models.sequelize.sync();
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  const email = user && user.emails && user.emails[0] && user.emails[0].value;

  if (!email) {
    const errorMessage = 'Did not get an email address from Auth0. Please make sure that Auth0 has access to the email address in your account.';
    return done(new Error(errorMessage), null);
  }

  const extendedUser = Object.assign({}, user, { email });
  return done(null, extendedUser);
});

passport.deserializeUser((sessionUser, done) => {
  done(null, sessionUser);
});

if (AUTH0_DOMAIN) {
  Auth0Strategy.prototype.authorizationParams = function(options = {}) {
    const params = {};
    if (options.connection && typeof options.connection === 'string') {
      params.connection = options.connection;
    }
    if (options.audience && typeof options.audience === 'string') {
      params.audience = options.audience;
    }
    params.account_verification = true;

    return params;
  };

  const strategy = new Auth0Strategy({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    scope: 'openid email',
    callbackURL: AUTH0_CALLBACK_URL,
    state: false,
  }, (accessToken, refreshToken, extraParams, profile, done) => done(null, profile));

  passport.use(strategy);
} else {
  debug('No Auth0 configuration found');
}

app.use(`${MOUNT_PATH}/callback`, passport.authenticate('auth0', { failureRedirect: `${MOUNT_PATH}/login` }), async (req, res) => {
  const { user } = req;
  if (!user) {
    res.redirect(`${FRONTEND_BASE_PATH}/#/login-failure`);
  } else {
    const email = user.emails && user.emails[0] && user.emails[0].value;
    users.createUserIfNecessary(email)
      .then(() => res.redirect(`${FRONTEND_BASE_PATH}/#/login-success`))
      .catch((error) => {
        debug('FAILED_CREATING_USER', error);
        res.redirect(`${FRONTEND_BASE_PATH}/#/login-failure`);
      });
  }
});

app.use(`${MOUNT_PATH}/login`, (req, res) => {
  passport.authenticate('auth0', {})(req, res);
});

app.use(`${MOUNT_PATH}/logout`, (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect(`${FRONTEND_BASE_PATH}/#/logout-success`);
});

app.use(`${MOUNT_PATH}/languages`, languagesRoutes);
app.use(`${MOUNT_PATH}/sentences`, sentencesRoutes);
app.use(`${MOUNT_PATH}/stats`, statsRoutes);
app.use(`${MOUNT_PATH}/users`, usersRoutes);
app.use(`${MOUNT_PATH}/votes`, votesRoutes);
app.use(`${MOUNT_PATH}/api`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.resolve(__dirname, '..', 'web', 'dist'), staticOptions));

module.exports = app;
