import React from 'react';
import { render } from '@testing-library/react';
import { createHashHistory } from 'history';
import fetchMock from 'jest-fetch-mock';

import Store from './store';
import App from './app';

test('should setup app', () => {
  fetchMock.mockResponse(JSON.stringify({}));

  const history = createHashHistory();
  const { container } = render(
    <Store history={history}>
      <App history={history} />
    </Store>
  );
  expect(container).not.toBeNull();
});
