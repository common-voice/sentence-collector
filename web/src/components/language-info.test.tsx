import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithLocalization } from '../../tests/test-utils';

import LanguageInfo from './language-info';

test('should render all stats', async () => {
  await renderWithLocalization(
    <LanguageInfo
      total={100}
      validated={5}
      rejected={7}
      unreviewedByYou={65}
      language="de"
      nativeLanguageName="Deutsch"
    />
  );
  expect(screen.queryByText('Deutsch')).toBeTruthy();
  expect(screen.queryByText('\u2068100\u2069 total sentences.')).toBeTruthy();
  expect(screen.queryByText('\u206888\u2069 sentences in review.')).toBeTruthy();
  expect(screen.queryByText('\u206865\u2069 sentences left for you to review.')).toBeTruthy();
  expect(screen.queryByText('Review now!')).toBeTruthy();
  expect((screen.queryByText('Review now!') as HTMLAnchorElement).href).toBe(
    'http://localhost/review/de'
  );
  expect(screen.queryByText('\u20685\u2069 validated sentences.')).toBeTruthy();
  expect(screen.queryByText('\u20687\u2069 rejected sentences.')).toBeTruthy();
});

test('should not render review link if none to review', async () => {
  await renderWithLocalization(
    <LanguageInfo
      unreviewedByYou={0}
      total={0}
      validated={0}
      rejected={0}
      language="en"
      nativeLanguageName="English"
    />
  );
  expect(screen.queryByText('Review now!')).toBeNull();
});

test('should render link to add if nothing to review', async () => {
  await renderWithLocalization(
    <LanguageInfo
      total={100}
      validated={100}
      unreviewedByYou={0}
      rejected={0}
      language="en"
      nativeLanguageName="English"
    />
  );
  expect(screen.queryByText('Add more sentences now!')).toBeTruthy();
  expect((screen.queryByText('Add more sentences now!') as HTMLAnchorElement).href).toBe(
    'http://localhost/add'
  );
});
