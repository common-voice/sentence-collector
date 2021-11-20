import React from 'react';

import { renderWithLocalization } from '../../../tests/test-utils';

import Home from './home';

test('should render home', async () => {
  const { container } = await renderWithLocalization(<Home />);
  expect(container).toMatchSnapshot();
});
