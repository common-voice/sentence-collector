import React from 'react';
import { render } from '@testing-library/react';

import Page from './page';
import Header from '../components/header';

jest.mock('../components/header');

test('should render page', () => {
  Header.mockReturnValue(<div>...Header...</div>);
  const { container } = render(<Page/>);
  expect(container).toMatchSnapshot();
});
