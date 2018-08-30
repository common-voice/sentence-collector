import btoa from 'btoa';
import KintoClient from 'kinto-http';

import {
  authedRead,
  authedCreate,
  authedCreateAndRead
} from './db/permissions';
import User from './db/collections/user';
import Sentences from './db/collections/sentences';

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
    this.user = new User(this.server, username);
  }

  async getBucket() {
    return this.server.bucket(BUCKET_NAME);
  }

  async auth() {
    return this.user.tryAuth();
  }

  async initDB() {
    await this.server.createBucket(BUCKET_NAME, authedRead());
    const bucket = await this.getBucket();

    // Create collections.
    await bucket.createCollection(User.NAME, authedCreate());
    await bucket.createCollection(Sentences.NAME, authedCreateAndRead());
  }

  async getUsers() {
    return this.user.getAllUsers();
  }

  async addLanguage(language) {
    return this.user.addLanguage(language);
  }

  async removeLanguage(language) {
    return this.user.removeLanguage(language);
  }
}

DB.BUCKET_NAME = BUCKET_NAME;
