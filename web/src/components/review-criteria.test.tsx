import React from 'react';
import { render } from '@testing-library/react';

import ReviewCriteria from './review-criteria';

test('should render criteria', () => {
  const { container } = render(<ReviewCriteria />);
  expect(container).toMatchSnapshot();
});
