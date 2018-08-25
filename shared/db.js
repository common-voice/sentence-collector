import btoa from 'btoa';
import KintoClient from 'kinto-http';
import User from './db/collections/user';

const BUCKET_NAME = 'App';

export default class DB {

  constructor(remote, username, password) {
    this.username = username;
    this.password = password;

    const defaultOptions = {
      remote,
    };

    if (username && password) {
      defaultOptions['headers'] = {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      };
    }

    this.server = new KintoClient(remote, defaultOptions);
    this.user = new User(this.server);

    this.authenticated = false;
  }

  async auth() {
    const authed = await this.user.tryAuth(this.username);
    this.authenticated = authed;
    return authed;
  }

  async initDB() {
    let id = await this.user.getId();
    await this.server.createBucket(BUCKET_NAME);
    const bucket = await this.server.bucket(BUCKET_NAME, { permissions: {
      read : ['system.Authenticated'],
    }});
    await bucket.createCollection(User.COLLECTION_NAME, { permissions: {
      'record:create': ['system.Authenticated'],
    }});
    return id;
  }
}

DB.BUCKET_NAME = BUCKET_NAME;
