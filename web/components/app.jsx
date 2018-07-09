import React from 'react';
import Form from './form';

export default class App extends React.Component {

  componentDidCatch(error, info) {
    debugger;
    console.error('top level error', error, info);
  }

  render() {
    return <Form />
  }
}
