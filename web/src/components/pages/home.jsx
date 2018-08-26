import React from 'react';
import welcome from '../../../../doc/welcome.md';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div dangerouslySetInnerHTML={{ __html: welcome }} />;
  }
}
