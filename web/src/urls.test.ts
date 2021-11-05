import { getReviewUrl } from './urls';

describe('getReviewUrl', () => {
  test('should get url for reviewing EN and EN UI', async () => {
    const url = getReviewUrl('en', 'en');
    expect(url).toEqual('/en/review/en');
  });

  test('should get url for reviewing DE and EN UI', async () => {
    const url = getReviewUrl('en', 'de');
    expect(url).toEqual('/en/review/de');
  });

  test('should get url for reviewing ES and DE UI', async () => {
    const url = getReviewUrl('de', 'es');
    expect(url).toEqual('/de/review/es');
  });
});
