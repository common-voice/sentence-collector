import btoa from 'btoa';
import KintoClient from 'kinto-http';

import {
  lockDown,
  authedCreateNoRead
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
    this.sentences = new Sentences(this.server);
  }

  async getBucket() {
    return this.server.bucket(BUCKET_NAME);
  }

  async auth() {
    return this.user.tryAuth();
  }

  async initDB() {
    await this.server.createBucket(BUCKET_NAME, lockDown());
    const bucket = await this.getBucket();

    // Create collections.
    await bucket.createCollection(User.NAME, authedCreateNoRead());
    await this.sentences.createAllCollections(bucket);
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

  async submitSentences(language, sentences) {
    return this.sentences.submitSentences(language, sentences);
  }
}

DB.BUCKET_NAME = BUCKET_NAME;
