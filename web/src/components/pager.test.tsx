import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pager from './pager';

const onPage = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  onPage.mockReset();
});

test('should render correct pager for page 0', async () => {
  render(<Pager page={0} lastPage={19} onPage={onPage}/>);
  expect(screen.getAllByText('1')[0]).toBeTruthy();
  expect(screen.getByText('<')).toBeTruthy();
  expect(screen.getAllByText('1')[1]).toBeTruthy();
  expect(screen.getByText('>')).toBeTruthy();
  expect(screen.getByText('20')).toBeTruthy();
});

test('should render correct pager for page in the middle', async () => {
  render(<Pager page={10} lastPage={19} onPage={onPage}/>);
  expect(screen.getByText('1')).toBeTruthy();
  expect(screen.getByText('<')).toBeTruthy();
  expect(screen.getByText('11')).toBeTruthy();
  expect(screen.getByText('>')).toBeTruthy();
  expect(screen.getByText('20')).toBeTruthy();
});

test('should render correct pager for last page', async () => {
  render(<Pager page={19} lastPage={19} onPage={onPage}/>);
  expect(screen.getByText('1')).toBeTruthy();
  expect(screen.getByText('<')).toBeTruthy();
  expect(screen.getAllByText('20')[0]).toBeTruthy();
  expect(screen.getByText('>')).toBeTruthy();
  expect(screen.getAllByText('20')[1]).toBeTruthy();
});

test('should call onPage with correct parameter', async () => {
  render(<Pager page={0} lastPage={19} onPage={onPage}/>);
  expect(screen.getByText('20')).toBeTruthy();

  await userEvent.click(screen.getByText('20'));
  expect(onPage).toHaveBeenCalledWith(19);
});
