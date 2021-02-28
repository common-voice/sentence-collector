import React from 'react';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

import Header from './header';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(redux, 'useSelector');
});

test('should render logged out state sidebar', () => {
  redux.useSelector.mockImplementation(() => ({ authed: false, migrationDone: false }));
  let component = shallow(<Header />);
  expect(component).toMatchSnapshot();
});

test('should render logged in state sidebar', () => {
  redux.useSelector.mockImplementation(() => ({ authed: true, migrationDone: false }));
  let component = shallow(<Header />);
  expect(component).toMatchSnapshot();
});
