import React from 'react';
import { render } from '@testing-library/react';

import Page from './page';
import Header from '../components/header';
import Footer from '../components/footer';

jest.mock('../components/header');
jest.mock('../components/footer');

test('should render page', () => {
  (Header as jest.Mock).mockReturnValue(<div>...Header...</div>);
  (Footer as jest.Mock).mockReturnValue(<div>...Footer...</div>);
  const { container } = render(<Page/>);
  expect(container).toMatchSnapshot();
});
