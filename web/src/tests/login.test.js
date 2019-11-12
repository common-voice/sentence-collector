import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';

import ConnectedLogin from '../containers/login';
import { getStore } from './testUtils';

test('Login button is disabled without input values', () => {
  const initialState = {
    app: {
      authed: false,
      username: null,
      errormessage: null,
      loginDisabled: true,
    },
  };
  let store = getStore(initialState);
  let component = mount(<Provider store={store}><ConnectedLogin /></Provider>);

  expect(component).toMatchSnapshot();
  expect(component.find('form#login button').is('[disabled]')).toBeTruthy();
});

