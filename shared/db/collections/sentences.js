import DB from '../../db.js';

const NAME = 'Sentences';

export default class Sentences {
  constructor(kintoServer, username) {
    this.username = username;
    this.server = kintoServer;
  }

  async getCollection() {
    return this.server.bucket(DB.BUCKET_NAME).collection(NAME);
  }
}

Sentences.NAME = NAME;
