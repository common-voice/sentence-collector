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
  t.context.sandbox.stub(Sentence, 'destroy').resolves();
  t.context.sandbox.stub(sequelize, 'query').resolves([exampleSentenceRecord]);
  t.context.transactionMock = {
    commit: t.context.sandbox.stub(),
  };
  t.context.sandbox.stub(sequelize, 'transaction').resolves(t.context.transactionMock);
  t.context.sandbox.stub(votes, 'addVoteForSentence').resolves();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('getSentencesForLocale: should query sentences', async (t) => {
  const foundSentences = await sentences.getSentencesForLocale({ localeId });
  t.true(Sentence.findAll.called);
  t.is(foundSentences.length, 1);
});

test.serial('getSentencesForLocale: should order by createdAt', async (t) => {
  await sentences.getSentencesForLocale({ localeId });
  const [queryParams] = Sentence.findAll.getCall(0).args;
  t.is(queryParams.order[0][0], 'createdAt');
  t.is(queryParams.order[0][1], 'DESC');
});

test.serial('getSentencesForLocale: should only get sentences for locale', async (t) => {
  await sentences.getSentencesForLocale({ localeId });
  const [queryParams] = Sentence.findAll.getCall(0).args;
  t.is(queryParams.where.localeId, localeId);
});

test.serial('getSentencesForLocale: should get sentences by params', async (t) => {
  const source = 'src';
  const batch = '1234-1234';
  const sentence = 'Hi';
  await sentences.getSentencesForLocale({ localeId, source, batch, sentence });
  const [queryParams] = Sentence.findAll.getCall(0).args;
  t.is(queryParams.where.localeId, localeId);
  t.is(queryParams.where.source, source);
  t.is(queryParams.where.batch, batch);
  t.is(queryParams.where.sentence, sentence);
});

test.serial('getApprovedSentencesForLocale: should get approved sentences for locale', async (t) => {
  await sentences.getApprovedSentencesForLocale(localeId);
  t.true(sequelize.query.calledOnce);
});

test.serial('getUndecidedSentencesForLocale: should get undecided sentences for locale', async (t) => {
  await sentences.getUndecidedSentencesForLocale(localeId);
  t.true(sequelize.query.calledOnce);
});

test.serial('getRejectedSentencesForLocale: should get undecided sentences for locale', async (t) => {
  await sentences.getRejectedSentencesForLocale(localeId);
  t.true(sequelize.query.calledOnce);
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

test.serial('addSentences: should add all unreviewed sentences', async (t) => {
  const sentenceParams = {
    sentences: {
      unreviewed: ['Hi', 'Hi another!'],
      validated: [],
    },
    userId: '1',
    source: 'source',
    locale: 'en',
  };

  const result = await sentences.addSentences(sentenceParams);

  t.true(sequelize.transaction.calledOnce);
  t.true(t.context.transactionMock.commit.calledOnce);
  t.true(Sentence.create.calledTwice);
  t.true(Sentence.create.calledWith({
    sentence: 'Hi',
    userId: '1',
    source: 'source',
    batch: sinon.match.string,
    localeId,
  }));

  t.false(votes.addVoteForSentence.called);
  t.is(result.errors.length, 0);
  t.is(result.duplicates, 0);
});

test.serial('addSentences: should fall back to en if no locale provided', async (t) => {
  const sentenceParams = {
    sentences: {
      unreviewed: ['Hi'],
      validated: [],
    },
    userId: '1',
    source: 'source',
  };

  await sentences.addSentences(sentenceParams);

  t.true(Sentence.create.calledOnce);
  t.true(Sentence.create.calledWith({
    sentence: 'Hi',
    userId: '1',
    source: 'source',
    batch: sinon.match.string,
    localeId,
  }));
});

test.serial('addSentences: should add all sentences - mixed validated and unreviewed', async (t) => {
  const sentenceParams = {
    sentences: {
      unreviewed: ['Hi!'],
      validated: ['I am a test', 'I am good too'],
    },
    userId: '1',
    source: 'source',
    locale: 'en',
  };

  const result = await sentences.addSentences(sentenceParams);

  t.is(Sentence.create.callCount, 3);
  t.is(result.errors.length, 0);
  t.is(result.duplicates, 0);
});

test.serial('addSentences: should return duplicate counter', async (t) => {
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
    userId: '1',
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
  sequelize.query.onCall(1).resolves([{ 'COUNT(*)': 2 }]);
  Sentence.count.onCall(0).resolves(10);
  sequelize.query.onCall(2).resolves([{ 'COUNT(*)': 4 }]);
  sequelize.query.onCall(3).resolves([{ 'COUNT(*)': 1 }]);
  Sentence.count.onCall(1).resolves(15);
  Sentence.count.onCall(2).resolves(1000);
  Sentence.count.onCall(3).resolves(5);

  const stats = await sentences.getStats(locales);
  t.deepEqual(stats, {
    all: {
      en: {
        added: 10,
        validated: 3,
        rejected: 2,
      },
      de: {
        added: 15,
        validated: 4,
        rejected: 1,
      },
    },
    totals: {
      total: 1000,
      languages: 5,
    }
  });
});

test.serial('getAllStatsForLocale: should fetch all stats correctly', async (t) => {
  sequelize.query.onCall(0).resolves([{ 'COUNT(*)': 4 }]);
  sequelize.query.onCall(1).resolves([{ 'COUNT(*)': 3 }]);
  Sentence.count.onCall(0).resolves(10);
  Sentence.count.onCall(1).resolves(5);

  const stats = await sentences.getAllStatsForLocale('en');
  t.deepEqual(stats, {
    validated: 4,
    rejected: 3,
    added: 10,
    contributors: 5,
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
  const locales = ['en', 'de'];
  const user = ['foo'];
  Sentence.count.onCall(0).resolves(2);
  Sentence.count.onCall(1).resolves(1);

  const stats = await sentences.getUserAddedSentencesPerLocale(locales, user);
  t.deepEqual(stats, {
    en: 2,
    de: 1,
  });
});

test.serial('getMySentences: should fetch correctly', async (t) => {
  const userId = ['foo'];
  Sentence.findAll.resolves([{
    id: 1,
    sentence: 'Hi',
    source: 'bla',
    localeId: 'en',
    batch: 1,
  }, {
    id: 2,
    sentence: 'Hi there',
    source: 'bla',
    localeId: 'en',
    batch: 1,
  }, {
    id: 3,
    sentence: 'Hallo',
    source: 'meh',
    localeId: 'de',
    batch: 2,
  }]);

  const stats = await sentences.getMySentences({ userId });
  t.deepEqual(stats, {
    en: {
      '1': {
        source: 'bla',
        sentences: [{
          id: 1,
          sentence: 'Hi',
          source: 'bla',
          localeId: 'en',
          batch: 1,
        }, {
          id: 2,
          sentence: 'Hi there',
          source: 'bla',
          localeId: 'en',
          batch: 1,
        }],
      },
    },
    de: {
      '2': {
        source: 'meh',
        sentences: [{
          id: 3,
          sentence: 'Hallo',
          source: 'meh',
          localeId: 'de',
          batch: 2,
        }],
      },
    },
  });
});

test.serial('deleteMySentences: should delete correctly', async (t) => {
  const userId = ['foo'];
  Sentence.destroy.resolves();

  await sentences.deleteMySentences({ userId, sentenceIds: [1, 2] });
  t.true(Sentence.destroy.calledWith({
    where: {
      id: [1, 2],
      userId,
    },
  }));
});
