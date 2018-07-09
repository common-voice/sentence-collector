import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }

  render() {
    return 'hello world! ' + this.id;
  }
}
