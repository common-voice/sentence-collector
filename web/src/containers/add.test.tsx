import React from 'react';
import * as redux from 'react-redux';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Add from './add';

const languages = [{
  id: 'en',
  name: 'English',
  nativeName: 'English',
}];

const sentences = [
  'This is a test.',
  'This as well!',
  'I am also a test.',
];

const source = 'Test';

const useSelectorMock = redux.useSelector as jest.Mock;
const useDispatchMock = redux.useDispatch as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  useSelectorMock.mockImplementation(() => ({
    allLanguages: languages,
    languages: ['en'],
    isUploadingSentences: false,
    sentenceSubmissionFailures: {},
  }));
});

test('should submit sentences including review', async () => {
  const dispatchMock = jest.fn(() => Promise.resolve({
    duplicates: 0,
    errors: [],
  }));
  useDispatchMock.mockImplementation(() => dispatchMock);

  render(<Add/>);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  fireEvent.input(screen.getByRole('textbox', { name: /Add public domain sentences/i }), { target: { value: sentences.join('\n') }});
  fireEvent.input(screen.getByRole('textbox', { name: /Where are these public domain sentences from?/i }), { target: { value: source }});
  await userEvent.click(screen.getByText(/confirm that these sentences/));
  await act(async () => {
    await userEvent.click(screen.getByText('Submit'));
  });

  expect(screen.getByText(/3 of these sentences are unreviewed/)).toBeTruthy();
  await userEvent.click(screen.getByText('Review'));

  await userEvent.click(screen.getAllByText('👍')[0]);
  await userEvent.click(screen.getAllByText('👎')[1]);
  await act(async () => {
    await userEvent.click(screen.getByText('Finish Review'));
  });

  expect(screen.getByText(/2 sentences are already reviewed/)).toBeTruthy();
  await act(async () => {
    await userEvent.click(screen.getByText('Confirm'));
  });

  expect(dispatchMock).toHaveBeenCalled();

  expect(screen.getByText(/Submitted sentences./)).toBeTruthy();
  expect(screen.getByText(/0 sentences were rejected as duplicates./)).toBeTruthy();
});

test('should submit sentences including review - with errors', async () => {
  const dispatchMock = jest.fn(() => Promise.resolve({
    duplicates: 3,
    errors: [{}, {}],
  }));
  useDispatchMock.mockImplementation(() => dispatchMock);

  render(<Add/>);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  fireEvent.input(screen.getByRole('textbox', { name: /Add public domain sentences/i }), { target: { value: sentences.join('\n') }});
  fireEvent.input(screen.getByRole('textbox', { name: /Where are these public domain sentences from?/i }), { target: { value: source }});
  await userEvent.click(screen.getByText(/confirm that these sentences/));
  await act(async () => {
    await userEvent.click(screen.getByText('Submit'));
  });

  expect(screen.getByText(/3 of these sentences are unreviewed/)).toBeTruthy();
  await userEvent.click(screen.getByText('Review'));

  await userEvent.click(screen.getAllByText('👍')[0]);
  await act(async () => {
    await userEvent.click(screen.getByText('Finish Review'));
  });

  expect(screen.getByText(/1 sentences are already reviewed/)).toBeTruthy();
  await act(async () => {
    await userEvent.click(screen.getByText('Confirm'));
  });

  expect(dispatchMock).toHaveBeenCalled();

  expect(screen.getByText(/Submitted sentences./)).toBeTruthy();
  expect(screen.getByText(/3 sentences were rejected as duplicates./)).toBeTruthy();
  expect(screen.getByText(/2 sentences failed/)).toBeTruthy();
});

test('should submit sentences including review - with unexpected server response', async () => {
  const dispatchMock = jest.fn(() => Promise.resolve({
    duplicates: 3, // errors missing...
  }));
  useDispatchMock.mockImplementation(() => dispatchMock);

  render(<Add/>);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  fireEvent.input(screen.getByRole('textbox', { name: /Add public domain sentences/i }), { target: { value: sentences.join('\n') }});
  fireEvent.input(screen.getByRole('textbox', { name: /Where are these public domain sentences from?/i }), { target: { value: source }});
  await userEvent.click(screen.getByText(/confirm that these sentences/));
  await act(async () => {
    await userEvent.click(screen.getByText('Submit'));
  });

  expect(screen.getByText(/3 of these sentences are unreviewed/)).toBeTruthy();
  await userEvent.click(screen.getByText('Review'));

  await userEvent.click(screen.getAllByText('👍')[0]);
  await act(async () => {
    await userEvent.click(screen.getByText('Finish Review'));
  });

  expect(screen.getByText(/1 sentences are already reviewed/)).toBeTruthy();
  await act(async () => {
    await userEvent.click(screen.getByText('Confirm'));
  });

  expect(dispatchMock).toHaveBeenCalled();

  expect(screen.getByText(/Unexpected response returned from server/)).toBeTruthy();
});
