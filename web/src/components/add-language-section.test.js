import React from 'react';
import { render, screen } from '@testing-library/react';

import LanguageSelector from './language-selector';
import AddLanguageSection from './add-language-section';

jest.mock('./language-selector');

beforeEach(() => {
  jest.clearAllMocks();
  LanguageSelector.mockReturnValue(<div>...LanguageSelector...</div>);
});

test('should render submit button', () => {
  render(<AddLanguageSection/>);
  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText('Add')).toBeTruthy();
});

test('should disable button on pending languages', () => {
  render(<AddLanguageSection pendingLanguages={true}/>);
  expect(screen.getByRole('button').disabled).toBeTruthy();
});

test('should render selector', () => {
  render(<AddLanguageSection/>);
  expect(screen.getByText('...LanguageSelector...')).toBeTruthy();
});
