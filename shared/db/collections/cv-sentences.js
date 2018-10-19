import { checkResultForErrors } from '../api-result-parser';
import { BUCKET_NAME } from '../../db.js';
import { allRead } from '../permissions';
import hash from '../../hash';
import batcher from '../batcher';
import ProgressBar from 'progress';

const NAME = 'CV_Sentences';
const PREFIX = NAME + '_';

class InsertingProgressBar extends ProgressBar {
  constructor(message, total) {
    super(message + ' [:bar] :rate per second', {
      total: total + 1,
      length: 20,
    });
    this.tick(1);
  }

  getRate() {
    return Math.round(this.curr / ((new Date - this.start) / 1000));
  }
}

export default class Sentences {
  constructor(kintoServer, username) {
    this.server = kintoServer;
    this.username = username;
  }

  getCollectionName(language) {
    return PREFIX + language;
  }

  getRecord(sentence) {
    return {
      id: hash(sentence),
      sentence,
      username: NAME,
    };
  }

  async createCollections(bucket, languages) {
    const bar = new InsertingProgressBar('creating collections', languages.length);
    const collectionResults = await bucket.batch(b => {
      languages.forEach(language => {
        const name = this.getCollectionName(language);
        b.createCollection(name, allRead());
      });
    });
    bar.tick(languages.length);
    return checkResultForErrors(collectionResults, languages);
  }

  async createFromMeta(bucket, metadata) {
    // Batch create the collections.
    const languages = metadata.map(item => item.language);
    const { successes } = await this.createCollections(bucket, languages);

    const totalSentences = metadata.reduce((accum, item) => (
      accum + item.sentences.length
    ), 0);

    const bar = new InsertingProgressBar('creating sentences', totalSentences);
    const resultsArray = await Promise.all(
      metadata.map(({ language, sentences }) => (
        this.submitSentencesBatcher(language, sentences, bar)
      ))
    );

    const submitted = resultsArray.reduce((accum, results, i) => {
      const { successes: S } = checkResultForErrors(results, metadata[i].sentences);
      return accum.concat(S);
    }, []);

    return {
      languages: successes,
      sentences: submitted,
    };
  }

  async getLanguages(bucket) {
    const result = await bucket.listCollections({
      filters: {
        like_id: PREFIX,
      },
    });

    console.log('result', result);
    return result.data.map(c => c.Name);
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

  async submitSentencesBatcher(language, sentences, bar) {
    const collection = await this.getCollection(language);
    const data = sentences.map(s => this.getRecord(s));
    return batcher(collection, 'createRecord', data, allRead(), bar);
  }

  /*
   * This is built in batcher, but does not allow us to see progress.
   * It is slightly faster, so I am keeping it around.
   */
  async submitSentences(language, sentences, bar) {
    const collection = await this.getCollection(language);
    const results = await collection.batch(batch => {
      for (let i = 0; i < sentences.length; i++) {
        const record = this.getRecord(sentences[i]);
        batch.createRecord(record, allRead());
      }
    });
    bar.tick(sentences.length);
    return results;
  }

  async count(language) {
    let collection = await this.getCollection(language);
    return collection.getTotalRecords();
  }
}

Sentences.NAME = NAME;
