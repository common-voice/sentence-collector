import React from 'react';
import * as redux from 'react-redux';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddLanguageSection from './add-language-section';

const allLanguages = [{
  id: 'en',
  name: 'English',
  nativeName: 'English',
}];

const dispatchMock = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(redux, 'useDispatch');
  jest.spyOn(redux, 'useSelector');
  
  (redux.useDispatch as jest.Mock).mockImplementation(() => dispatchMock);
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [],
    pendingLanguages: false,
  }));
});

test('should render submit button', () => {
  act(() => { render(<AddLanguageSection />); });
  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText('Add Language')).toBeTruthy();
});

test('should disable button on pending languages', () => {
  (redux.useSelector as jest.Mock).mockImplementation(() => ({
    allLanguages,
    languages: [],
    pendingLanguages: true,
  }));
  act(() => { render(<AddLanguageSection />); });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should disable button when no language selected', () => {
  act(() => { render(<AddLanguageSection />); });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should enable button when language selected', () => {
  act(() => { render(<AddLanguageSection />); });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);
});

test('should add language and set button to disabled', async () => {
  act(() => { render(<AddLanguageSection />); });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);

  await act(async () => {
    await userEvent.click(screen.getByRole('button'));
    expect(dispatchMock).toHaveBeenCalled();
  });

  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});
