import React from 'react';

import '../../../css/profile.css';
import { getLanguageName } from '../../../../shared/languages';
import LanguageSelector from '../language-selector';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  setMessage(message) {
    this.setState({ message });
  }

  setError(error) {
    this.setState({ error });
  }

  async onAdd(evt) {
    try {
      evt.preventDefault();
      const el = evt.currentTarget.form.querySelector('.language-selector');
      if (!el) {
        throw new Error('No select found');
      }

      if (el.selectedIndex === 0) {
        throw new Error('Please select a language');
      }

      const language = el.options[el.selectedIndex].value;
      await this.props.addLanguage(language);
      el.selectedIndex = 0;
      this.setMessage('Language added: ' + getLanguageName(language));
    } catch (err) {
      console.error(err);
      this.setError('Could not add language: ' + err);
    }
  }

  async onRemove(evt) {
    try {
      evt.preventDefault();
      const language = evt.currentTarget.dataset.lang;
      await this.props.removeLanguage(language);
      this.setMessage('Language removed: ' + getLanguageName(language));
    } catch (err) {
      console.error(err);
      this.setError('Could not remove language: ' + err);
    }
  }

  render() {
    return (
      <form>
        <h2>Profile: { this.props.username }</h2>
        { this.state.message && ( <p>{this.state.message}</p> ) }
        { this.state.error && ( <p style={ { color: 'red' } }>{this.state.error}</p> ) }
        <section>
          <p>Your languages:</p>
          { this.props.languages && this.props.languages.length > 0 ? (
            <ul>
              { this.props.languages.map((language, i) => (
                <li key={i}>
                  { getLanguageName(language) }
                  <button className="remove-lang" data-lang={language}
                          onClick={this.onRemove} disabled={this.props.pending}>
                    remove
                </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not added any languages yet</p>
          )}
        </section>
        <section>
          <label className="language-selector-label" htmlFor="language-selector">
            Add a language
          </label>
          <LanguageSelector disabled={this.props.pending}
                            name="language-selector"
                            filters={this.props.languages} />
          <button disabled={this.props.pending}
                  onClick={this.onAdd} className="add-language">Add</button>
        </section>
      </form>
    );
  }
}
