import { getAllLanguages } from '../../languages';
import DB from '../../db.js';
import { authedCreateAndRead } from '../permissions';
import hash from '../hash';

const NAME = 'Sentences';
const PREFIX = NAME + '_';

export default class Sentences {
  constructor(kintoServer, username) {
    this.server = kintoServer;
    this.username = username;
  }

  getCollectionName(code) {
    return PREFIX + code;
  }

  getRecord(language, sentence) {
    return {
      id: hash(sentence),
      sentence,
      username: this.username,
    };
  }

  async createAllCollections(bucket) {
    const languages = getAllLanguages();
    for (let i = 0; i < languages.length; i++) {
      const code = languages[i].code;
      const name = this.getCollectionName(code);
      await bucket.createCollection(name, authedCreateAndRead());
    }
  }

  async getCollection(language) {
    return this.server.bucket(DB.BUCKET_NAME)
      .collection(this.getCollectionName(language));
  }

  async submitSentences(language, sentences) {
    const collection = await this.getCollection(language);
    const results = await collection.batch(batch => {
      for (let i = 0; i < sentences.length; i++) {
        const record = this.getRecord(language, sentences[i]);
        batch.createRecord(record, authedCreateAndRead);
      }
    });

    let newSentences = [];
    let errors = [];
    results.forEach(result => {
      if (result.status === 200 || result.status === 201) {
        newSentences.push(result.body.data.sentence);
      } else if (result.status === 403) {
        errors.push(new Error('sentence already submitted by another user'));
      } else {
        errors.push(new Error(result.body.message));
      }
    });

    return {
      sentences: newSentences,
      errors,
    };
  }
}

Sentences.NAME = NAME;
