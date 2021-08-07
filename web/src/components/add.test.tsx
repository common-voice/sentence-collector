import React from 'react';
import * as redux from 'react-redux';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderRoute } from '../../tests/test-utils';
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

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  (redux.useSelector as jest.Mock).mockImplementation(() => ({
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
  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);

  renderRoute(<Add />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  fireEvent.input(screen.getByRole('textbox', { name: /Add public domain sentences/i }), { target: { value: sentences.join('\n') } });
  fireEvent.input(screen.getByRole('textbox', { name: /Where are these public domain sentences from?/i }), { target: { value: source } });
  await userEvent.click(screen.getByText(/confirm that these sentences/));
  await act(async () => {
    await userEvent.click(screen.getByText('Submit'));
  });

  expect(screen.getByText(/3 of these sentences are unreviewed/)).toBeTruthy();
  await userEvent.click(screen.getByText('Review'));

  await waitFor(() => {
    expect(screen.getByText(sentences[2])).toBeTruthy();
  });
  await act(async () => {
    await userEvent.click(screen.getByText('Approve'));
  });

  await waitFor(() => {
    expect(screen.getByText(sentences[1])).toBeTruthy();
  });
  await act(async () => {
    await userEvent.click(screen.getByText('Reject'));
  });

  await waitFor(() => {
    expect(screen.getByText(sentences[0])).toBeTruthy();
  });

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
  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);

  renderRoute(<Add />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  fireEvent.input(screen.getByRole('textbox', { name: /Add public domain sentences/i }), { target: { value: sentences.join('\n') } });
  fireEvent.input(screen.getByRole('textbox', { name: /Where are these public domain sentences from?/i }), { target: { value: source } });
  await userEvent.click(screen.getByText(/confirm that these sentences/));
  await act(async () => {
    await userEvent.click(screen.getByText('Submit'));
  });

  expect(screen.getByText(/3 of these sentences are unreviewed/)).toBeTruthy();
  await userEvent.click(screen.getByText('Review'));

  await waitFor(() => {
    expect(screen.getByText(sentences[2])).toBeTruthy();
  });
  await act(async () => {
    await userEvent.click(screen.getByText('Approve'));
  });

  await waitFor(() => {
    expect(screen.getByText(sentences[1])).toBeTruthy();
  });
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
  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);

  renderRoute(<Add />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  fireEvent.input(screen.getByRole('textbox', { name: /Add public domain sentences/i }), { target: { value: sentences.join('\n') } });
  fireEvent.input(screen.getByRole('textbox', { name: /Where are these public domain sentences from?/i }), { target: { value: source } });
  await userEvent.click(screen.getByText(/confirm that these sentences/));
  await act(async () => {
    await userEvent.click(screen.getByText('Submit'));
  });

  expect(screen.getByText(/3 of these sentences are unreviewed/)).toBeTruthy();
  await userEvent.click(screen.getByText('Review'));

  await waitFor(() => {
    expect(screen.getByText(sentences[2])).toBeTruthy();
  });
  await act(async () => {
    await userEvent.click(screen.getByText('Approve'));
  });

  await waitFor(() => {
    expect(screen.getByText(sentences[1])).toBeTruthy();
  });
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
