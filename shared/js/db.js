// import * as Kinto from '../vendor/kinto.js';
import * as btoa from 'btoa';
import * as KintoClient from '../vendor/kinto-http.js';

export default class DB {
  static REMOTE_URL: string = 'https://kinto.mozvoice.org/v1';
  static BUCKET_NAME: string = 'APP';
  static COLLECTION_NAME: string = 'User';

  // local: Kinto;
  server: KintoClient;

  constructor(username: string, password: string) {
    const defaultOptions = {
      remote: DB.REMOTE_URL,
      headers: {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    };

    // this.local = new Kinto(defaultOptions);
    this.server = new KintoClient(DB.REMOTE_URL, defaultOptions);
  }

  async getId() {
    const result = await this.server.fetchServerInfo();
    return result.user.id;
  }

  async init() {
    try {
      let result = await this.server.createBucket(DB.BUCKET_NAME);
      console.log(result);

      const bucket = await this.server.bucket(DB.BUCKET_NAME);
      result = await bucket.createCollection(DB.COLLECTION_NAME);

      const collection = await bucket.collection(DB.COLLECTION_NAME);
      console.log(collection);
    } catch (err) {
      console.error('init error', err);
    }
  }
}
