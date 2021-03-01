import React from 'react';
import { render } from '@testing-library/react';

import Page from './page';
import Header from '../components/header';
import HeaderBtn from '../components/header-btn';

jest.mock('../components/header');
jest.mock('../components/header-btn');

test('should render page', () => {
  Header.mockReturnValue(<div>...Header...</div>);
  HeaderBtn.mockReturnValue(<div>...HeaderBtn...</div>);
  const { container } = render(<Page/>);
  expect(container).toMatchSnapshot();
});
