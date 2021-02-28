import React from 'react';
import { render, screen } from '@testing-library/react';

import Modal from './modal';

test('should render modal content', () => {
  render(<Modal><p>I am content!</p></Modal>);
  expect(screen.queryByText('I am content!')).toBeTruthy();
});

test('should render modal button text', () => {
  render(<Modal text="foo"/>);
  expect(screen.queryByText('foo')).toBeTruthy();
});

test('should render all buttons', () => {
  render(<Modal/>);
  expect(screen.queryAllByRole('button').length).toBe(2);
});