import btoa from 'btoa';
import KintoClient from 'kinto-http';

import {
  lockDown,
  authedCreateNoRead
} from './db/permissions';
import User from './db/collections/user';
import Sentences from './db/collections/sentences';
import CVSentences from './db/collections/cv-sentences';

export const BUCKET_NAME = 'App';

export default class DB {

  constructor(remote, username, password) {
    this.username = username;
    this.password = password;

    const defaultOptions = {
      remote,
    };

    if (username && password) {
      defaultOptions['headers'] = {
        Authorization: "Basic " + btoa(`${username}:${password}`),
      };
    }

    this.server = new KintoClient(remote, defaultOptions);
    this.user = new User(this.server, username);
    this.sentences = new Sentences(this.server, username);
    this.cvSentences = new CVSentences(this.server, username);
  }

  async getBucket() {
    return this.server.bucket(BUCKET_NAME);
  }

  async auth() {
    return this.user.tryAuth();
  }

  async initDB() {
    await this.server.createBucket(BUCKET_NAME, lockDown());
    const bucket = await this.getBucket();

    // Create collections.
    await bucket.createCollection(User.NAME, authedCreateNoRead());
    await this.sentences.createAllCollections(bucket);
  }

  async initCV(metadata) {
    const bucket = await this.getBucket();
    return this.cvSentences.createFromMeta(bucket, metadata);
  }

  async getUsers() {
    return this.user.getAllUsers();
  }

  async addLanguage(language) {
    return this.user.addLanguage(language);
  }

  async removeLanguage(language) {
    return this.user.removeLanguage(language);
  }

  async getSentences(language) {
    return this.sentences.getAll(language);
  }

  async getSentencesNotVoted(language) {
    return this.sentences.getNotVoted(language);
  }

  async submitSentences(language, sentences) {
    return this.sentences.submitSentences(language, sentences);
  }

  async getSentenceCount(language) {
    return this.sentences.count(language);
  }

  async validateSentences(language, sentences) {
    return this.sentences.validateSentences(language, sentences);
  }

  async vote(language, validated, invalidated) {
    return this.sentences.vote(language, validated, invalidated);
  }

  async getLanguageInfoForMe(language) {
    const [ submitted, validated ] = await Promise.all([
      this.sentences.getMySentences(language),
      this.sentences.getMyVotes(language),
    ]);
    return {
      language,
      submitted,
      validated,
    };
  }

  async getLanguagesMetaForMe(languages) {
    return Promise.all(languages.map(language => {
      return this.getLanguageInfoForMe(language);
    }));
  }
}

DB.BUCKET_NAME = BUCKET_NAME;
