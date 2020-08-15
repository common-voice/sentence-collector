import React from 'react';

export default class Notice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props;
    return (<p class="notice error">{text}</p>);
  }
}
