import React from 'react';
import { render } from '@testing-library/react';

import Page from './page';
import Header from '../components/header';
import HeaderBtn from '../components/header-btn';

jest.mock('../components/header');
jest.mock('../components/header-btn');

test('should render page', () => {
  Header.mockReturnValue('...Header...');
  HeaderBtn.mockReturnValue('...HeaderBtn/...');
  const { container } = render(<Page/>);
  expect(container).toMatchSnapshot();
});
