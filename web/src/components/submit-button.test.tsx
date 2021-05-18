import React from 'react';
import { render, screen } from '@testing-library/react';

import SubmitButton from './submit-button';

test('should render submit button', () => {
  const text = 'Submit sentences';
  render(<SubmitButton pendingAction={false} submitText={text}/>);
  expect(screen.getByRole('button').textContent).toBe(text);
});

test('should render spinner', () => {
  const text = 'Submit sentences';
  render(<SubmitButton pendingAction={true} submitText={text}/>);
  expect(screen.getByRole('button').textContent).toBe('Submitting...');
  expect(screen.queryByText(text)).toBeNull();
});
