import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from './home';

test('should render home', () => {
  const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});
