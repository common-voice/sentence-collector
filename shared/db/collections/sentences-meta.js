import { getAllLanguages } from '../../languages';
import { BUCKET_NAME } from '../../db.js';
import { parseBatchResults } from '../api-result-parser';
import { authedCreateReadAndWrite, authedReadAndWrite } from '../permissions';
import hash from '../../hash';

const NAME = 'Sentences_Meta';
const PREFIX = NAME + '_';
const USER_PREFIX = PREFIX + 'UserVote_';

const VALID = true;
const INVALID = false;

export default class SentencesMeta {
  constructor(kintoServer, sentences, username) {
    this.server = kintoServer;
    this.sentences = sentences;
    this.username = username;
  }

  getCollectionName(code) {
    return PREFIX + code;
  }

  getUserKey(username) {
    return USER_PREFIX + username;
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
    const results = await bucket.batch(b => {
      for (let i = 0; i < languages.length; i++) {
        const code = languages[i].code;
        const name = this.getCollectionName(code);
        b.createCollection(name, authedCreateReadAndWrite());
      }
    });

    const { successes, errors } = parseBatchResults(results);
    if (errors.length > 0) {
      throw new Error('Failed: create meta collections' + errors.join(','));
    }
    if (successes.length !== languages.length) {
      throw new Error('Failed: missing meta collections');
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

  async getNotVoted(language) {
    const filters = {};
    // filter current user from votes.
    filters['has_' + this.getUserKey(this.username)] = false;
    const collection = await this.getCollection(language);
    const result = await collection.listRecords({ filters });
    return result.data;
  }

  async submitSentences(language, sentences) {
    const collection = await this.getCollection(language);
    const results = await collection.batch(batch => {
      for (let i = 0; i < sentences.length; i++) {
        const record = this.getDefaultRecord(sentences[i].sentence);
        batch.createRecord(record, {
          ...authedReadAndWrite(),
          safe: true,
        });
      }
    });

    const { successes, errors } = parseBatchResults(results);
    return {
      sentences: successes,
      errors,
    };
  }

  getVoteRecords(isValid, sentences, existing) {
    return sentences.map(sentence => {
      let record = existing[sentence.id] ?
        existing[sentence.id] : this.getDefaultRecord(sentence.sentence);
      if (isValid) {
        record.valid.push(this.username);
        record[this.getUserKey(this.username)] = VALID;
      } else {
        record.invalid.push(this.username);
        record[this.getUserKey(this.username)] = INVALID;
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
