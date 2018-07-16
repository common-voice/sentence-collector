import React from 'react';

import Form from '../form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form
        authed={this.props.authed}
        message={this.props.message}
        onSubmit={this.props.onLogin}
        onLogout={this.props.onLogout}
      />
    );
  }
}
