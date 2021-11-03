import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithLocalization } from '../../tests/test-utils';

import Footer from './footer';

test('should render footer', async () => {
  await renderWithLocalization(<Footer />);
  expect(screen.getByText('Discourse')).toBeTruthy();
});
