'use strict';

const debug = require('debug')('sentencecollector:app');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const sentencesRoutes = require('./routes/sentences');
const languagesRoutes = require('./routes/languages');
const statsRoutes = require('./routes/stats');
const usersRoutes = require('./routes/users');
const votesRoutes = require('./routes/votes');
// const connectionString = require('./lib/connectionString');

const {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  SESSION_SECRET,
  NODE_ENV,
} = process.env;

const env = NODE_ENV || 'development';
const config = require('./config/config.json')[env];

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(require('cookie-parser')());

// const connectionStringConfig = config.use_env_variable ? connectionString.parse(process.env[config.use_env_variable]) : {};

// const storeOptions = {
//   host: config.host || connectionStringConfig.host,
//   user: config.username || connectionStringConfig.username,
//   password: config.password || connectionStringConfig.password,
//   database: config.database || connectionStringConfig.database,
//   createDatabaseTable: true,
// };

app.use(
  session({
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: NODE_ENV === 'production',
    },
    secret: SESSION_SECRET,
    // store: new MySQLStore(storeOptions),
    proxy: true,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  const extendedUser = Object.assign({}, user, { email: user && user.emails && user.emails[0] && user.emails[0].value });
  return done(null, extendedUser);
});
passport.deserializeUser((sessionUser, done) => done(null, sessionUser));

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
    callbackURL: config.callbackURL,
    state: false,
  }, (accessToken, refreshToken, extraParams, profile, done) => done(null, profile));

  passport.use(strategy);
} else {
  debug('No Auth0 configuration found');
}

app.use('/callback', passport.authenticate('auth0', { failureRedirect: '/login' }), async (req, res) => {
  const { user } = req;
  if (!user) {
    res.redirect('/#/login-failure');
  } else {
    res.redirect('/#/login-success');
  }
});

app.use('/login', (req, res) => {
  passport.authenticate('auth0', {})(req, res);
});

app.use('/logout', (req, res) => {
  res.clearCookie('connect.sid');
  res.redirect('/#/logout-success');
});

app.use('/languages', languagesRoutes);
app.use('/sentences', sentencesRoutes);
app.use('/stats', statsRoutes);
app.use('/users', usersRoutes);
app.use('/votes', votesRoutes);
app.use(express.static(path.resolve(__dirname, '..', 'web', 'dist')));

module.exports = app;
