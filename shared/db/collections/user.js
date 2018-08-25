import DB from '../../db.js';

const NAME = 'User';

export default class User {

  constructor(kintoServer) {
    this.id = null;
    this.server = kintoServer;
  }

  async getCollection() {
    return this.server.bucket(DB.BUCKET_NAME).collection(NAME);
  }

  async getId() {
    const result = await this.server.fetchServerInfo();
    this.id = result.user.id;
  }

  async tryAuth(username) {
    try {
      await this.server.bucket(DB.BUCKET_NAME)
        .collection(NAME).createRecord({ id: username });
      return true;
    } catch (err) {

      if (err.data && err.data.code === 403) {
        return false;
      }

      console.error('unknown auth failure', err);
      return false;
    }
  }

  async listAll() {
    try {
      const collection = await this.getCollection();
      const result = await collection.listRecords();
      const users = result.data.map(user => user.id);
      console.log('Users', users);
      return users;
    } catch (err) {
      console.error('--list user error--', err);
      return false;
    }
  }
}

User.COLLECTION_NAME = NAME;
