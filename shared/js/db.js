import btoa from 'btoa';
import KintoClient from 'kinto-http';
import Bucket from 'kinto-http/lib/bucket.js'

import User from './collections/user';

const REMOTE_URL = 'https://kinto.mozvoice.org/v1';
const BUCKET_NAME = 'App';

export default class DB {

  constructor(username, password) {
    this.username = username;
    this.password = password;

    const defaultOptions = {
      remote: REMOTE_URL,
    };

    if (username && password) {
      defaultOptions['headers'] = {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      };
    }

    this.server = new KintoClient(REMOTE_URL, defaultOptions);
    this.bucket = new Bucket(this.server, BUCKET_NAME);
    this.user = new User(this.server, this.bucket);

    this.authenticated = false;
  }

  async auth() {
    const authed = await this.user.tryAuth(this.username);
    this.authenticated = authed;
    console.log('authed?', authed);
    return authed;
  }

  async initDB() {
    try {
      let id = await this.user.getId();
      await this.server.createBucket(BUCKET_NAME);
      const bucket = await this.server.bucket(BUCKET_NAME, { permissions: {
        read : ['system.Authenticated'],
      }});
      await bucket.createCollection(User.COLLECTION_NAME, { permissions: {
        'record:create': ['system.Authenticated'],
      }});
      return id;
    } catch (err) {
      console.error('init error', err);
    }
  }
}

DB.BUCKET_NAME = BUCKET_NAME;
