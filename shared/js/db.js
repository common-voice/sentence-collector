// import * as Kinto from '../vendor/kinto.js';
import btoa from 'btoa';
import KintoClient from '../vendor/kinto-http.js';

const REMOTE_URL = 'https://kinto.mozvoice.org/v1';
const BUCKET_NAME = 'APP';
const COLLECTION_NAME = 'User';

export default class DB {

  constructor(username: string, password: string) {
    const defaultOptions = {
      remote: REMOTE_URL,
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    };

    // this.local = new Kinto(defaultOptions);
    this.server = new KintoClient(REMOTE_URL, defaultOptions);
  }

  async getId() {
    const result = await this.server.fetchServerInfo();
    return result.user.id;
  }

  async init() {
    try {
      let result = await this.server.createBucket(BUCKET_NAME);
      console.log(result);

      const bucket = await this.server.bucket(BUCKET_NAME);
      result = await bucket.createCollection(COLLECTION_NAME);

      const collection = await bucket.collection(COLLECTION_NAME);
      console.log(collection);
    } catch (err) {
      console.error('init error', err);
    }
  }
}
