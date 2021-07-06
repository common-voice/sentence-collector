import React from 'react';
import { render } from '@testing-library/react';

import Header from './header';
import Footer from './footer';
import Page from './page';

jest.mock('./header');
jest.mock('./footer');

test('should render page', () => {
  (Header as jest.Mock).mockReturnValue(<div>...Header...</div>);
  (Footer as jest.Mock).mockReturnValue(<div>...Footer...</div>);
  const { container } = render(<Page/>);
  expect(container).toMatchSnapshot();
});
