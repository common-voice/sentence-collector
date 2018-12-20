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

// Two out of three votes need to be say the sentence is valid
// for it to be approved.
const APPROVAL_MIN_VALID_VOTES = 2;
const APPROVAL_MIN_TOTAL_VOTES = 3;

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

  getDefaultRecord(sentence, source = '') {
    return {
      id: hash(sentence),
      sentence,
      source,
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

  async getLanguages(bucket) {
    const result = await this.getLanguageTables(bucket);
    return result.map(c => c.replace(PREFIX, ''));
  }

  async getLanguageTableNames(bucket) {
    const result = await bucket.listCollections({
      filters: {
        like_id: PREFIX,
      },
    });
    return result.data.map(c => c.id);
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

  async getLanguageAndSentenceCounts(bucket) {
    const languages = await this.getLanguageTableNames(bucket);

    const responses = await this.server.batch((batch) => {
      for (const cid of languages) {
        batch.collection(cid).getTotalRecords();
      }
    }, { bucket: "App" });

    return responses.reduce((info, response) => {
      let numberOfSentences = 0;
      try {
        numberOfSentences = parseInt(response.headers['Total-Records'], 10);
      } catch (err) { /* ignore */ }

      info.sentences = info.sentences + numberOfSentences;

      if (numberOfSentences > 0) {
        info.languages = info.languages + 1;
      }

      return info;
    }, { languages: 0, sentences: 0 });
  }

  async getNotVoted(language) {
    const filters = {};
    // filter current user from votes.
    filters['has_' + this.getUserKey(this.username)] = false;
    filters['has_approved'] = false;
    const collection = await this.getCollection(language);
    const result = await collection.listRecords({ filters });
    return result.data;
  }

  async submitSentences(language, sentences, source) {
    const collection = await this.getCollection(language);
    const results = await collection.batch(batch => {
      for (let i = 0; i < sentences.length; i++) {
        const record = this.getDefaultRecord(sentences[i].sentence, source);
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

  async getMyVotes(language) {
    const collection = await this.getCollection(language);
    const filters = {};
    filters['has_' + this.getUserKey(this.username)] = true;
    const result = await collection.listRecords({ filters });
    return result.data;
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

      const isApproved = this.checkIfApproved(record);
      if (typeof isApproved === 'undefined') {
        // We don't have any approval yet (not enough votes)
        // therefore we leave the record as is
        return record;
      }

      record.approved = isApproved;

      return record;
    });
  }

  checkIfApproved(record) {
    const validVotes = record.valid.length;
    const invalidVotes = record.invalid.length;
    const totalVotes = validVotes + invalidVotes;

    if (totalVotes < APPROVAL_MIN_TOTAL_VOTES) {
      return;
    }

    return validVotes >= APPROVAL_MIN_VALID_VOTES;
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

  async count(language) {
    let collection = await this.getCollection(language);
    return collection.getTotalRecords();
  }
}

SentencesMeta.NAME = NAME;
