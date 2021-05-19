import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import LanguageInfo from './language-info';
import LanguageStats from './language-stats';

jest.mock('./language-info');

const languages = ['en', 'de'];
const allLanguages = [{
  id: 'en',
  name: 'English',
  nativeName: 'English'
}, {
  id: 'de',
  name: 'German',
  nativeName: 'Deutsch',
}];
const languageStats = {
  en: {
    added: 0,
    validated: 0,
    rejected: 0,
  },
  de: {
    added: 0,
    validated: 0,
    rejected: 0,
  },
};
const userUnreviewedStats = {
  en: 0,
  de: 0,
};

beforeEach(() => {
  jest.clearAllMocks();

  (LanguageInfo as jest.Mock).mockReturnValue(<div>...LanguageInfo...</div>);
});

test('should render stats for all passed languages', () => {
  render(
    <LanguageStats
      languages={languages}
      allLanguages={allLanguages}
      languageStats={languageStats}
      userUnreviewedStats={userUnreviewedStats}
    />
  );

  expect(screen.queryAllByText('...LanguageInfo...').length).toBe(2);
});

test('should render note if no languages', () => {
  render(
    <BrowserRouter>
      <LanguageStats
        languages={[]}
        allLanguages={[]}
      />
    </BrowserRouter>
  );

  expect(screen.getByText(/You have no languages./)).toBeTruthy();
  expect(screen.queryByText('...LanguageInfo...')).toBeNull();
});
