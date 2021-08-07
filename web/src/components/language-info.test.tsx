import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import LanguageInfo from './language-info';

test('should render all stats', () => {
  render(
    <BrowserRouter>
      <LanguageInfo
        total={100}
        validated={5}
        rejected={7}
        unreviewedByYou={65}
        language="de"
        languageName="German"
        nativeLanguageName="Deutsch"
      />
    </BrowserRouter>
  );
  expect(screen.queryByText('Deutsch (German)')).toBeTruthy();
  expect(screen.queryByText('100 total sentences.')).toBeTruthy();
  expect(screen.queryByText('88 sentences in review.')).toBeTruthy();
  expect(screen.queryByText('65 sentences left for you to review.')).toBeTruthy();
  expect(screen.queryByText('Review now!')).toBeTruthy();
  expect((screen.queryByText('Review now!') as HTMLAnchorElement).href).toBe(
    'http://localhost/review/de'
  );
  expect(screen.queryByText('5 validated sentences.')).toBeTruthy();
  expect(screen.queryByText('7 rejected sentences.')).toBeTruthy();
});

test('should not render review link if none to review', () => {
  render(
    <BrowserRouter>
      <LanguageInfo
        unreviewedByYou={0}
        total={0}
        validated={0}
        rejected={0}
        language="en"
        languageName="English"
        nativeLanguageName="English"
      />
    </BrowserRouter>
  );
  expect(screen.queryByText('Review now!')).toBeNull();
});

test('should render link to add if nothing to review', () => {
  render(
    <BrowserRouter>
      <LanguageInfo
        total={100}
        validated={100}
        unreviewedByYou={0}
        rejected={0}
        language="en"
        languageName="English"
        nativeLanguageName="English"
      />
    </BrowserRouter>
  );
  expect(screen.queryByText('Add more sentences now!')).toBeTruthy();
  expect((screen.queryByText('Add more sentences now!') as HTMLAnchorElement).href).toBe(
    'http://localhost/add'
  );
});
