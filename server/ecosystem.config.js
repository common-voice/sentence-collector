'use strict';

module.exports = {
  apps: [{
    name: "sentencecollector",
    script: "npm",
    args: "run start:server",
    env: {
      NODE_ENV: "production",
      DEBUG: "sentencecollector:*",
    },
  }],
};
