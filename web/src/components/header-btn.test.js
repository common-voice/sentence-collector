import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HeaderBtn from './header-btn';

const clickHandler = jest.fn();

test('Header button should be rendered when closed', () => {
  render(<HeaderBtn isOpen={false} handleClick={clickHandler} />);
  expect(screen.getByRole('button')).toBeTruthy();
});

test('Header button should be rendered when open', () => {
  render(<HeaderBtn isOpen={true} handleClick={clickHandler} />);
  expect(screen.getByRole('button')).toBeTruthy();
});

test('Header button should close header on click', async () => {
  render(<HeaderBtn isOpen={true} handleClick={clickHandler} />);
  await userEvent.click(screen.getByRole('button'));
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
