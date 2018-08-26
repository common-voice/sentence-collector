import React from 'react';

import howTo from '../../../../doc/how-to.md';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div dangerouslySetInnerHTML={{ __html: howTo }} />;
  }
}
