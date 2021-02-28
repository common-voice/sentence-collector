import React from 'react';
import { render } from '@testing-library/react';

import Home from './home';

test('should render home', () => {
  const { container } = render(<Home/>);
  expect(container).toMatchSnapshot();
});
