'use strict';

module.exports = {
  apps: [{
    name: "sentencecollector",
    cwd: "/app/server/",
    script: "npm",
    args: "start",
    env: {
      NODE_ENV: "production",
      DEBUG: "sentencecollector:*",
    },
  }],
};
