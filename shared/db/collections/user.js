import DB from '../../db.js';

const NAME = 'User';

export default class User {

  constructor(kintoServer) {
    this.server = kintoServer;
  }

  async getCollection() {
    return this.server.bucket(DB.BUCKET_NAME).collection(NAME);
  }

  async getId() {
    const result = await this.server.fetchServerInfo();
    return result.user.id;
  }

  async tryAuth(username) {
    try {
      const userid = await this.getId();
      const record = {
        id: username,
        userid,
      };

      await this.server.bucket(DB.BUCKET_NAME)
        .collection(NAME).createRecord(record);
      return true;
    } catch (err) {

      if (err.data && err.data.code === 403) {
        return false;
      }

      console.error('unknown auth failure', err);
      return false;
    }
  }

  async getAllUsers() {
    try {
      const collection = await this.getCollection();
      const result = await collection.listRecords();
      const users = result.data.map(user => user.id);
      return users;
    } catch (err) {
      console.error('--list user error--', err);
      return false;
    }
  }
}

User.COLLECTION_NAME = NAME;
