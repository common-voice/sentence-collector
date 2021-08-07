import React from 'react';
import { render } from '@testing-library/react';
import { createHashHistory } from 'history';

import Store from './store';

test('should setup store', () => {
  const history = createHashHistory();
  const { container } = render(
    <Store history={history}>
      <h1>Foo</h1>
    </Store>
  );
  expect(container).toMatchSnapshot();
});
