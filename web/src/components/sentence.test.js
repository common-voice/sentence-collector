import React from 'react';
import { render, screen } from '@testing-library/react';

import Sentence from './sentence';

test('should render sentence', () => {
  render(<Sentence>foo</Sentence>);
  expect(screen.queryByText('foo')).toBeTruthy();
});

test('should set lang attribute', () => {
  render(<Sentence language="en">foo</Sentence>);
  expect(screen.queryByText('foo').lang).toBe('en');
});

test('should set direction auto', () => {
  render(<Sentence language="en">foo</Sentence>);
  expect(screen.queryByText('foo').dir).toBe('auto');
});
