import DB from '../../kinto.js';

const NAME = 'User';

export default class User {
  constructor(kintoServer, username) {
    this.username = username;
    this.server = kintoServer;
  }

  async getCollection() {
    return this.server.bucket(DB.BUCKET_NAME).collection(NAME);
  }

  async getId() {
    const result = await this.server.fetchServerInfo();
    return result.user.id;
  }

  getInitialRecord() {
    return {
      id: this.username,
      languages: [],
    };
  }

  async createNew() {
    try {
      const collection = await this.getCollection();
      return await collection.createRecord(this.getInitialRecord());
    } catch (err) {
      if (err.data && err.data.code === 403) {
        throw new Error('invalid login credentials');
      }

      throw new Error('unknown failure when creating user: ' + err);
    }

  }

  async tryAuth() {
    let collection, user;

    try {
      collection = await this.getCollection();
      user = await collection.getRecord(this.username);
    } catch (err) {
      if (!err.data || !err.data.code === 403) {
        throw new Error('unknown failure when fetching user: ' + err);
      }
    }

    if (!user) {
      user = await this.createNew();
    }

    return user.data;
  }

  async setSetting(key, value) {
    const collection = await this.getCollection();
    const record = await collection.getRecord(this.username);
    const user = record.data;

    if (!user.settings) {
      user.settings = {};
    }

    user.settings[key] = value;
    const updatedUser = await collection.updateRecord(user);
    return updatedUser.settings;
  }

  async addLanguage(language) {
    const collection = await this.getCollection();
    const record = await collection.getRecord(this.username);
    const user = record.data;

    if (user.languages && user.languages.indexOf(language) !== -1) {
      throw new Error('Language already added.');
    }

    user.languages = user.languages ?
      user.languages.concat(language) : [language];
    const updatedUser = await collection.updateRecord(user);
    return updatedUser.data.languages;
  }

  async removeLanguage(language) {
    const collection = await this.getCollection();
    const record = await collection.getRecord(this.username);
    const user = record.data;
    const languages = user.languages;

    if (!languages) {
      throw new Error('No languages to be removed');
    }

    const index = languages.indexOf(language);
    if (index === -1) {
      throw new Error('Language cannot be removed, not in list.');
    }

    user.languages.splice(index, 1);
    const updatedUser = await collection.updateRecord(user);
    return updatedUser.data.languages;
  }
}

User.NAME = NAME;
