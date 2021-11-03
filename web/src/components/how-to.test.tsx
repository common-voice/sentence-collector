import React from 'react';
import { render } from '@testing-library/react';

import { renderWithLocalization } from '../../tests/test-utils';

import HowTo from './how-to';

test('should render how to', async () => {
  const { container } = await renderWithLocalization(<HowTo />);
  expect(container).toMatchSnapshot();
});
