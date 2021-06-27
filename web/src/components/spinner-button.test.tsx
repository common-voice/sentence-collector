import React from 'react';
import { render, screen } from '@testing-library/react';

import SpinnerButton from './spinner-button';

test('should render spinner button', () => {
  render(<SpinnerButton/>);
  expect(screen.queryByRole('button')).toBeTruthy();
  expect(screen.queryByText('Submitting...')).toBeTruthy();
});

test('should render spinner button with custom text', () => {
  render(<SpinnerButton text="Hi..." />);
  expect(screen.queryByRole('button')).toBeTruthy();
  expect(screen.queryByText('Hi...')).toBeTruthy();
});
