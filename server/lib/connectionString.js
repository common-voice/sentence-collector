'use strict';

module.exports = {
  parse,
};

// Heavily inspired by https://github.com/sindilevich/connection-string-parser/blob/master/src/connection-string-parser.ts
// .. but simplified so we do not support all types of strings
function parse(connectionString) {
  const connectionStringParser = new RegExp(
    "^\\s*" + // Optional whitespace padding at the beginning of the line
    "([^:]+)://" + // Scheme (Group 1)
    "(?:([^:@,/?=&]+)(?::([^:@,/?=&]+))?@)?" + // User (Group 2) and Password (Group 3)
    "([^@/?=&]+)" + // Host address(es) (Group 4)
    "(?:/([^:@,/?=&]+)?)?" + // Endpoint (Group 5)
    "(?:\\?([^:@,/?]+)?)?" + // Options (Group 6)
    "\\s*$", // Optional whitespace padding at the end of the line
    "gi");

  if (!connectionString.includes("://")) {
    throw new Error(`No scheme found in URI ${connectionString}`);
  }

  const [,, username, password, host, database] = connectionStringParser.exec(connectionString);

  return {
    username,
    password,
    host,
    database,
  };
}