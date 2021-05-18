import React from 'react';
import { render } from '@testing-library/react';

import Store from './store';

test('should setup store', () => {
  const history = {};
  const { container } = render(<Store history={history}/>);
  expect(container).toMatchSnapshot();
});
