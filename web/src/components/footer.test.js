import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from './footer';

test('should render footer', () => {
  render(<Footer />);
  expect(screen.getByText('Discourse')).toBeTruthy();
});
