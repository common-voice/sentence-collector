import React from 'react';
import { render } from '@testing-library/react';
import { createHashHistory } from 'history';

import Store from '../store';
import App from './app';

test('should setup app', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fetch.mockResponse(JSON.stringify({}));

  const history = createHashHistory();
  const { container } = render(
    <Store history={history}>
      <App history={history} />
    </Store>
  );
  expect(container).not.toBeNull();
});
