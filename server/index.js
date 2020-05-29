'use strict';

const debug = require('debug')('sentencecollector:index');
const app = require('./app');

const port = process.env.PORT || '3333';

const server = app.listen(port, () => {
  debug(`Listening on http://0.0.0.0:${port}..`);
});

server.setTimeout(300000);
