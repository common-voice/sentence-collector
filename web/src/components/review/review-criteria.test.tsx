import React from 'react';

import { renderWithLocalization } from '../../../tests/test-utils';

import ReviewCriteria from './review-criteria';

test('should render criteria', async () => {
  const { container } = await renderWithLocalization(<ReviewCriteria />);
  expect(container).toMatchSnapshot();
});
