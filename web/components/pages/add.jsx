import React from 'react';

import LanguageSelector from '../language-selector';
import './add.css';

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();
    let lang = document.querySelector('#add-form select');
    if (!lang || !lang.value) {
      this.setState({
        message: 'Please select a langauge.',
      });
      return;
    }

    let sentences = document.querySelector('#sentences-input').value;
    if (!sentences) {
      this.setState({
        message: 'Please add sentences.',
      });
      return;
    }

    // TODO: implement sentence sanity check.
    document.getElementById('add-form').reset();
    this.setState({
      message: 'Sentences (fake) submitted.',
    });
  }

  render() {
    return <form id="add-form" onSubmit={this.onSubmit}>
      <h2>Add Sentences</h2>
      <p>Please add your sentences by typing or copy&pasting them below.</p>
      <section id="form-message">{this.state && this.state.message}</section>
      <section>
        <label id="language-selector-label" htmlFor="language-selector">
          Select Language
        </label>
        <LanguageSelector name="language-selector" />
      </section>
      <section>
        <label htmlFor="sentences-input">Enter sentences</label>
        <textarea id="sentences-input" />
      </section>
      <section>
        <button>Submit</button>
      </section>
    </form>;
  }
}
