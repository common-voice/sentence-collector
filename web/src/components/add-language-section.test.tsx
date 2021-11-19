import React from 'react';
import * as redux from 'react-redux';
import { screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithLocalization } from '../../tests/test-utils';

import AddLanguageSection from './add-language-section';

const allLanguages = [
  {
    id: 'en',
    nativeName: 'English',
  },
];

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');

  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [],
    pendingLanguages: false,
  }));
});

test('should render submit button', async () => {
  await act(async () => {
    await renderWithLocalization(<AddLanguageSection />);
  });
  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText('Add Language')).toBeTruthy();
});

test('should disable button on pending languages', async () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [],
    pendingLanguages: true,
  }));
  await act(async () => {
    await renderWithLocalization(<AddLanguageSection />);
  });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should disable button when no language selected', async () => {
  await act(async () => {
    await renderWithLocalization(<AddLanguageSection />);
  });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should enable button when language selected', async () => {
  await act(async () => {
    await renderWithLocalization(<AddLanguageSection />);
  });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);
});

test('should add language and set button to disabled', async () => {
  await act(async () => {
    await renderWithLocalization(<AddLanguageSection />);
  });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);

  await act(async () => {
    await userEvent.click(screen.getByRole('button'));
    expect(dispatchMock).toHaveBeenCalled();
  });

  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should show error when language can not be added', async () => {
  dispatchMock.mockRejectedValue(new Error('oh no'));

  await act(async () => {
    await renderWithLocalization(<AddLanguageSection />);
  });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);

  await act(async () => {
    await userEvent.click(screen.getByRole('button'));
    expect(dispatchMock).toHaveBeenCalled();
  });

  expect(screen.queryByText(/Could not add language/)).toBeTruthy();
});
