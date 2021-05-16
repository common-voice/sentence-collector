import React from 'react';
import { render } from '@testing-library/react';

import App from './app';
import Root from './root';

jest.mock('./app');

test('should setup app', () => {
  App.mockReturnValue('<App.../>');
  const { container } = render(<Root/>);
  expect(container.firstNode).not.toBeNull();
});
