import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddLanguageSection from './add-language-section';

const allLanguages = [{
  id: 'en',
  name: 'English',
  nativeName: 'English',
}];

test('should render submit button', () => {
  render(<AddLanguageSection allLanguages={allLanguages}/>);
  expect(screen.getByRole('button')).toBeTruthy();
  expect(screen.getByText('Add Language')).toBeTruthy();
});

test('should disable button on pending languages', () => {
  render(<AddLanguageSection pendingLanguages={true} allLanguages={allLanguages}/>);
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should disable button when no language selected', () => {
  render(<AddLanguageSection pendingLanguages={false} allLanguages={allLanguages}/>);
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should enable button when language selected', () => {
  render(<AddLanguageSection pendingLanguages={false} allLanguages={allLanguages}/>);
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);
});

test('should call onAdd and set button to disabled', async () => {
  const onAdd = jest.fn();
  render(<AddLanguageSection pendingLanguages={false} allLanguages={allLanguages} onAdd={onAdd}/>);
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);

  await act(async () => {
    await userEvent.click(screen.getByRole('button'));
    expect(onAdd).toHaveBeenCalledWith('en');
  });

  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBeTruthy();
});

test('should show error when adding fails', async () => {
  const onAdd = jest.fn(() => { throw new Error('nope'); });
  render(<AddLanguageSection pendingLanguages={false} allLanguages={allLanguages} onAdd={onAdd}/>);
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
  expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false);

  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText(/Could not add language/)).toBeTruthy();
});
