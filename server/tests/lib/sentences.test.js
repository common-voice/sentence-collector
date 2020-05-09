import test from 'ava';
import sinon from 'sinon';
import { Sentence, sequelize } from '../../lib/models';
import votes from '../../lib/votes';
import sentences from '../../lib/sentences';

const localeId = 'en';
const exampleSentenceRecord = {
  id: 1,
  sentence: 'Hi',
  localeId,
};

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(Sentence, 'count').resolves(0);
  t.context.sandbox.stub(Sentence, 'create').resolves(exampleSentenceRecord);
  t.context.sandbox.stub(Sentence, 'findAll').resolves([exampleSentenceRecord]);
  t.context.sandbox.stub(sequelize, 'query').resolves([exampleSentenceRecord]);
  t.context.sandbox.stub(votes, 'addVoteForSentence').resolves();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('getSentencesForLocale: should query sentences', async (t) => {
  const foundSentences = await sentences.getSentencesForLocale(localeId);
  t.true(Sentence.findAll.called);
  t.is(foundSentences.length, 1);
});

test.serial('getSentencesForLocale: should order by createdAt', async (t) => {
  await sentences.getSentencesForLocale(localeId);
  const [queryParams] = Sentence.findAll.getCall(0).args;
  t.is(queryParams.order[0][0], 'createdAt');
  t.is(queryParams.order[0][1], 'DESC');
});

test.serial('getSentencesForLocale: should only get sentences for locale', async (t) => {
  await sentences.getSentencesForLocale(localeId);
  const [queryParams] = Sentence.findAll.getCall(0).args;
  t.is(queryParams.where.localeId, localeId);
});

test.serial('getSentencesForReview: should query sentences', async (t) => {
  const foundSentences = await sentences.getSentencesForReview(localeId);
  t.true(sequelize.query.called);
  t.is(foundSentences.length, 1);
});

test.serial('getRejectedSentences: should group sentences correctly', async (t) => {
  const foundSentences = await sentences.getRejectedSentences(localeId);
  t.true(sequelize.query.called);
  t.deepEqual(foundSentences, {
    [localeId]: [exampleSentenceRecord],
  });
});

test.serial('addedSentences: should add all unreviewed sentences', async (t) => {
  const sentenceParams = {
    sentences: {
      unreviewed: ['Hi', 'Hi another!'],
      validated: [],
    },
    user: 'foo',
    source: 'source',
    locale: 'en',
  };

  const result = await sentences.addSentences(sentenceParams);

  t.true(Sentence.create.calledTwice);
  t.true(Sentence.create.calledWith({
    sentence: 'Hi',
    user: 'foo',
    source: 'source',
    batch: sinon.match.string,
    localeId,
  }));

  t.false(votes.addVoteForSentence.called);
  t.is(result.errors.length, 0);
  t.is(result.duplicates, 0);
});

test.serial('addedSentences: should fall back to en if no locale provided', async (t) => {
  const sentenceParams = {
    sentences: {
      unreviewed: ['Hi'],
      validated: [],
    },
    user: 'foo',
    source: 'source',
  };

  await sentences.addSentences(sentenceParams);

  t.true(Sentence.create.calledOnce);
  t.true(Sentence.create.calledWith({
    sentence: 'Hi',
    user: 'foo',
    source: 'source',
    batch: sinon.match.string,
    localeId,
  }));
});

test.serial('addedSentences: should add all sentences - mixed validated and unreviewed', async (t) => {
  const sentenceParams = {
    sentences: {
      unreviewed: ['Hi!'],
      validated: ['I am a test', 'I am good too'],
    },
    user: 'foo',
    source: 'source',
    locale: 'en',
  };

  const result = await sentences.addSentences(sentenceParams);

  t.is(Sentence.create.callCount, 3);
  t.is(result.errors.length, 0);
  t.is(result.duplicates, 0);
});

test.serial('addedSentences: should return duplicate counter', async (t) => {
  const error = new Error('duplicate');
  error.parent = {
    errno: 1062,
  };
  Sentence.create.onCall(2).rejects(error);

  const sentenceParams = {
    sentences: {
      unreviewed: ['Hi!'],
      validated: ['I am a test', 'I am a test'],
    },
    user: 'foo',
    source: 'source',
    locale: 'en',
  };

  const result = await sentences.addSentences(sentenceParams);

  t.is(Sentence.create.callCount, 3);
  t.is(result.errors.length, 0);
  t.is(result.duplicates, 1);
});

test.serial('getStats: should fetch all stats correctly', async (t) => {
  const locales = ['en', 'de'];
  sequelize.query.onCall(0).resolves([{ 'COUNT(*)': 3 }]);
  Sentence.count.onCall(0).resolves(10);
  sequelize.query.onCall(1).resolves([{ 'COUNT(*)': 4 }]);
  Sentence.count.onCall(1).resolves(15);
  Sentence.count.onCall(2).resolves(1000);
  Sentence.count.onCall(3).resolves(5);

  const stats = await sentences.getStats(locales);
  t.deepEqual(stats, {
    en: {
      added: 10,
      validated: 3,
    },
    de: {
      added: 15,
      validated: 4,
    },
    total: 1000,
    languages: 5,
  });
});

test.serial('getUnreviewedByYouCountForLocales: should fetch unreviewed stats correctly', async (t) => {
  const locales = ['en', 'de'];
  const user = ['foo'];
  sequelize.query.onCall(0).resolves([{ 'COUNT(*)': 10 }]);
  sequelize.query.onCall(1).resolves([{ 'COUNT(*)': 5 }]);

  const stats = await sentences.getUnreviewedByYouCountForLocales(locales, user);
  t.deepEqual(stats, {
    en: 10,
    de: 5,
  });
});

test.serial('getUserAddedSentencesPerLocale: should fetch user stats correctly', async (t) => {
  const user = ['foo'];
  Sentence.findAll.resolves([{
    Locale: {
      name: 'English'
    },
    Vote: [{
      approval: true,
    }, {
      approval: true,
    }],
    sentence: 'Hi',
  }, {
    Locale: {
      name: 'English'
    },
    Vote: [],
    sentence: 'Hi there',
  }, {
    Locale: {
      name: 'German'
    },
    Vote: [{
      approval: true,
    }, {
      approval: true,
    }],
    sentence: 'Hallo',
  }]);

  const stats = await sentences.getUserAddedSentencesPerLocale(user);
  t.deepEqual(stats, {
    English: {
      added: 2,
      validated: 1,
    },
    German: {
      added: 1,
      validated: 1,
    },
  });
});
