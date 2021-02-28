import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import LanguageSelector from './language-selector';

test('should single option without null option', () => {
  const languages = [{
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  }];

  render(
      <LanguageSelector
        languages={languages}
      />
  );
  expect(screen.queryByText('German (Deutsch)')).toBeTruthy();
  expect(screen.queryByText('--')).toBeNull();
});

test('should add null option', () => {
  const languages = [{
    id: 'en',
    name: 'English',
    nativeName: 'English',
  }, {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  }];

  render(
      <LanguageSelector
        languages={languages}
      />
  );
  expect(screen.queryByText('--')).toBeTruthy();
  expect(screen.queryByText('English (English)')).toBeTruthy();
  expect(screen.queryByText('German (Deutsch)')).toBeTruthy();
});

test('should filter options', () => {
  const languages = [{
    id: 'en',
    name: 'English',
    nativeName: 'English',
  }, {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  }];
  const filters = ['en'];

  render(
      <LanguageSelector
        languages={languages}
        filters={filters}
      />
  );
  expect(screen.queryByText('German (Deutsch)')).toBeTruthy();
  expect(screen.queryByText('English (English)')).toBeNull();
});

test('should select option', () => {
  const languages = [{
    id: 'en',
    name: 'English',
    nativeName: 'English',
  }, {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  }];
  const onChange = jest.fn();

  render(
      <LanguageSelector
        languages={languages}
        onChange={onChange}
      />
  );

  expect(screen.queryByText('German (Deutsch)')).toBeTruthy();
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'de' } });
  expect(onChange).toHaveBeenCalledWith('de');
});
