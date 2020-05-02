'use strict';

module.exports = {
  apps: [{
    name: "sentencecollector",
    script: "./server/index.js",
    env: {
      NODE_ENV: "production",
      DEBUG: "sentencecollector:*",
    },
  }],
};
