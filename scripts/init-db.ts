declare function require(moduleName: string): any;
declare const global: any;

const KintoClient = require('kinto-http');
const btoa2 = require('btoa');

// Kinto http needs fetch on the global scope.
const fetch2 = require('node-fetch');
global.fetch = fetch2;

const username: string = 'admin';
const password: string = 'password';

const AUTH_HEADER: string = "Basic " + btoa2(`${username}:${password}`);
const REMOTE_URL: string = 'https://kinto.mozvoice.org/v1';
const BUCKET_NAME: string = 'APP';

const defaultOptions = {
  remote: REMOTE_URL,
  headers: {
    Authorization: AUTH_HEADER,
  },
  bucket: BUCKET_NAME,
};

const server = new KintoClient(REMOTE_URL, defaultOptions);
server.fetchServerInfo()
  .then(result => result.user.id)
  .then(console.log.bind(console, 'your user id is:'))
  .catch(console.error.bind(console));
