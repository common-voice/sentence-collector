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
      isRTL: false,
    },
    {
      id: 'de',
      isRTL: false,
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
      isRTL: false,
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
  expect(screen.queryByText(/de/)).toBeTruthy();
  expect(screen.queryByText('--')).toBeNull();
});

test('should add null option', async () => {
  const languages = [
    {
      id: 'en',
      isRTL: false,
    },
    {
      id: 'de',
      isRTL: false,
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
  expect(screen.queryByText(/en/)).toBeTruthy();
  expect(screen.queryByText(/de/)).toBeTruthy();
});

test('should filter options', async () => {
  const languages = [
    {
      id: 'en',
      isRTL: false,
    },
    {
      id: 'de',
      isRTL: false,
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
  expect(screen.queryByText(/de/)).toBeTruthy();
  expect(screen.queryByText(/en/)).toBeNull();
});

test('should select option', async () => {
  const languages = [
    {
      id: 'en',
      isRTL: false,
    },
    {
      id: 'de',
      isRTL: false,
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

  expect(screen.queryByText(/de/)).toBeTruthy();
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'de' } });
  expect(onChange).toHaveBeenCalledWith('de');
});
