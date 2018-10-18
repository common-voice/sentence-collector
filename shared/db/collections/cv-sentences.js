import { checkResultForErrors } from '../api-result-parser';
import { BUCKET_NAME } from '../../db.js';
//change
import { lockDown } from '../permissions';
import hash from '../../hash';

const NAME = 'CV_Sentences';
const PREFIX = NAME + '_';

export default class Sentences {
  constructor(kintoServer, username) {
    this.server = kintoServer;
    this.username = username;
  }

  getCollectionName(language) {
    return PREFIX + language;
  }

  getRecord(language, sentence) {
    return {
      id: hash(sentence),
      sentence,
      username: NAME,
    };
  }

  async createFromMeta(bucket, metadata) {
    // Batch create the collections.
    const languages = metadata.map(item => item.language);
    const collectionResults = await bucket.batch(b => {
      languages.forEach(language => {
        const name = this.getCollectionName(language);
        b.createCollection(name, lockDown());
      });
    });
    checkResultForErrors(collectionResults, languages);

    // Now create all the sentences.
    for (let i = 0; i < metadata.length; i++) {
      const language = metadata[i].language;
      const sentences = metadata[i].sentences;
      const sentResult = await this.submitSentences(language, sentences);
      checkResultForErrors(sentResult, sentences);
    }
  }

  async getCollection(language) {
    return this.server.bucket(BUCKET_NAME)
      .collection(this.getCollectionName(language));
  }

  async getAll(language) {
    const collection = await this.getCollection(language);
    const result = await collection.listRecords();
    return result.data;
  }

  async submitSentences(language, sentences) {
    const collection = await this.getCollection(language);
    return collection.batch(batch => {
      for (let i = 0; i < sentences.length; i++) {
        const record = this.getRecord(language, sentences[i]);
        batch.createRecord(record, lockDown());
      }
    });
  }

  async count(language) {
    let collection = await this.getCollection(language);
    return collection.getTotalRecords();
  }
}

Sentences.NAME = NAME;
