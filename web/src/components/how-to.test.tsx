import React from 'react';
import { render } from '@testing-library/react';

import HowTo from './how-to';

test('should render how to', () => {
  const { container } = render(<HowTo />);
  expect(container).toMatchSnapshot();
});
