import SentencesMeta from './sentences-meta';
import { getAllLanguages } from '../../languages';
import { parseBatchResults } from '../api-result-parser';
import { BUCKET_NAME } from '../../db.js';
import { authedCreateAndRead } from '../permissions';
import hash from '../../hash';

const NAME = 'Sentences';
const PREFIX = NAME + '_';

export default class Sentences {
  constructor(kintoServer, username) {
    this.server = kintoServer;
    this.username = username;
    this.meta = new SentencesMeta(this.server, this, username);
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
    await this.meta.createAllCollections(bucket);
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

  async getNotVoted(language) {
    return this.meta.getNotVoted(language);
  }

  async submitSentences(language, sentences) {
    const collection = await this.getCollection(language);
    const results = await collection.batch(batch => {
      for (let i = 0; i < sentences.length; i++) {
        const record = this.getRecord(language, sentences[i]);
        batch.createRecord(record, authedCreateAndRead);
      }
    });

    // Use only successes from sentence table to feed meta table.
    const { successes, errors } = parseBatchResults(results);
    const {
      sentences: metas,
      errors: metaErrors,
    } = await this.meta.submitSentences(language, successes);

    return {
      sentences: metas.map(data => data.sentences),
      errors: errors.concat(metaErrors),
    };
  }

  async count(language) {
    let collection = await this.getCollection(language);
    return collection.getTotalRecords();
  }

  async vote(language, validated, invalidated) {
    return this.meta.vote(language, validated, invalidated);
  }
}

Sentences.NAME = NAME;
