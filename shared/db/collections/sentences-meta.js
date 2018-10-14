import { getAllLanguages } from '../../languages';
import { BUCKET_NAME } from '../../db.js';
import { authedCreateReadAndWrite } from '../permissions';
import hash from '../../hash';

const NAME = 'Sentences_Meta';
const PREFIX = NAME + '_';

export default class SentencesMeta {
  constructor(kintoServer, sentences, username) {
    this.server = kintoServer;
    this.sentences = sentences;
    this.username = username;
  }

  getCollectionName(code) {
    return PREFIX + code;
  }

  getDefaultRecord(sentence) {
    return {
      id: hash(sentence),
      sentence,
      valid: [],
      invalid: [],
    };
  }

  async createAllCollections(bucket) {
    const languages = getAllLanguages();
    for (let i = 0; i < languages.length; i++) {
      const code = languages[i].code;
      const name = this.getCollectionName(code);
      await bucket.createCollection(name, authedCreateReadAndWrite());
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

  getVoteRecords(isValid, sentences, existing) {
    return sentences.map(sentence => {
      let record = existing[sentence.id] ?
        existing[sentence.id] : this.getDefaultRecord(sentence.sentence);
      if (isValid) {
        record.valid.push(this.username);
      } else {
        record.invalid.push(this.username);
      }
      return record;
    });
  }

  async vote(language, validated, invalidated) {
    const list = [...validated, ...invalidated].map(sentence => sentence.id);
    const collection = await this.getCollection(language);
    const result = await collection.listRecords({
      filters: {
        in_id: list
      },
    });

    const records = result.data;
    const existing = records.reduce((accum, record) => {
      accum[record.id] = record;
      return accum;
    }, {});

    const results = await collection.batch(c => {
      let updateRecords = [
        ...this.getVoteRecords(true, validated, existing),
        ...this.getVoteRecords(false, invalidated, existing),
      ];

      updateRecords.forEach(record => {
        c.updateRecord(record, {
          safe: true,
          last_modified: record.last_modified,
        });
      });
    });

    let votes = [];
    let errors = [];
    results.forEach(result => {
      if (result.status === 200 || result === 201) {
        votes.push(result.body.data);
      } else {
        console.error('vote error', result.status, result.body);
        errors.push(result);
      }
    });

    return {
      votes,
      errors,
    };
  }
}

SentencesMeta.NAME = NAME;
