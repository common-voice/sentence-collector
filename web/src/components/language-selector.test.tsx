import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithLocalization } from '../../tests/test-utils';

import LanguageSelector from './language-selector';

let onChange: jest.Mock;

beforeEach(() => {
  onChange = jest.fn();
});

test('should render label', async () => {
  const languages = [
    {
      id: 'en',
      nativeName: 'English',
    },
    {
      id: 'de',
      nativeName: 'Deutsch',
    },
  ];

  await renderWithLocalization(
    <LanguageSelector
      onChange={onChange}
      disabled={false}
      selected={languages[0].id}
      languages={languages}
      filters={[]}
      labelText="This is a label."
    />
  );
  expect(screen.queryByLabelText('This is a label.')).toBeTruthy();
});

test('should show single option without null option', async () => {
  const languages = [
    {
      id: 'de',
      nativeName: 'Deutsch',
    },
  ];

  await renderWithLocalization(
    <LanguageSelector
      onChange={onChange}
      disabled={false}
      selected={languages[0].id}
      filters={[]}
      languages={languages}
      labelText="This is a label."
    />
  );
  expect(screen.queryByText(/Deutsch/)).toBeTruthy();
  expect(screen.queryByText('--')).toBeNull();
});

test('should add null option', async () => {
  const languages = [
    {
      id: 'en',
      nativeName: 'English',
    },
    {
      id: 'de',
      nativeName: 'Deutsch',
    },
  ];

  await renderWithLocalization(
    <LanguageSelector
      onChange={onChange}
      disabled={false}
      selected={languages[0].id}
      filters={[]}
      languages={languages}
      labelText="This is a label."
    />
  );
  expect(screen.queryByText('--')).toBeTruthy();
  expect(screen.queryByText(/English/)).toBeTruthy();
  expect(screen.queryByText(/Deutsch/)).toBeTruthy();
});

test('should filter options', async () => {
  const languages = [
    {
      id: 'en',
      nativeName: 'English',
    },
    {
      id: 'de',
      nativeName: 'Deutsch',
    },
  ];

  await renderWithLocalization(
    <LanguageSelector
      onChange={onChange}
      disabled={false}
      selected={languages[0].id}
      languages={languages}
      filters={[languages[0]]}
      labelText="This is a label."
    />
  );
  expect(screen.queryByText(/Deutsch/)).toBeTruthy();
  expect(screen.queryByText(/English/)).toBeNull();
});

test('should select option', async () => {
  const languages = [
    {
      id: 'en',
      nativeName: 'English',
    },
    {
      id: 'de',
      nativeName: 'Deutsch',
    },
  ];

  await renderWithLocalization(
    <LanguageSelector
      disabled={false}
      selected={languages[0].id}
      filters={[]}
      languages={languages}
      onChange={onChange}
      labelText="This is a label."
    />
  );

  expect(screen.queryByText(/Deutsch/)).toBeTruthy();
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'de' } });
  expect(onChange).toHaveBeenCalledWith('de');
});
