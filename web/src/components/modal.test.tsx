import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from './modal';

test('should render modal content', () => {
  render(
    <Modal>
      <p>I am content!</p>
    </Modal>
  );
  expect(screen.queryByText('I am content!')).toBeTruthy();
});

test('should render modal button text', () => {
  render(<Modal text="foo" />);
  expect(screen.queryByText('foo')).toBeTruthy();
});

test('should render all buttons', () => {
  render(<Modal />);
  expect(screen.queryAllByRole('button').length).toBe(2);
});

test('should not fail when toggling modal button', async () => {
  render(<Modal />);
  await userEvent.click(screen.queryAllByRole('button')[0]);
  expect(screen.queryAllByRole('button').length).toBe(2);
});
