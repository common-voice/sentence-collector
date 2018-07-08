import * as btoa from 'btoa';
import * as KintoClient from 'kinto-http';

export default class DB {
  static REMOTE_URL: string = 'https://kinto.mozvoice.org/v1';
  static BUCKET_NAME: string = 'APP';

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
}
