import React from 'react';
import { Link } from 'react-router-dom';

import '../../../css/profile.css';
import WebDB from '../../web-db';
import { getLanguageName } from '../../../../shared/languages';
import LanguageSelector from '../language-selector';
import { arrayCompare } from '../../../../shared/util';

const DEFAULT_STATE = {
  totalSubmitted: 0,
  totalValidated: 0,
  languageInfo: {},
  loading: false,
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  setMessage(message) {
    this.setState({ message });
  }

  setError(error) {
    this.setState({ error });
  }

  async loadUserLanguageInfo() {
    // No need to load langauge meta data if user hasn't added any languages.
    if (!this.props.languages || this.props.languages.length < 1) {
      return;
    }

    try {
      this.setState({
        loading: true,
        languageInfo: DEFAULT_STATE.languageInfo,
      });

      const db = new WebDB(this.props.username, this.props.password);
      const metas = await db.getLanguagesMetaForMe(this.props.languages);

      // Transform array of language data into langauge info state.
      let totalSubmitted = 0;
      let totalValidated = 0;
      const languageInfo = metas.reduce((accum, languageMeta) => {
        const { language, submitted, validated } = languageMeta;

        totalSubmitted += submitted.length;
        totalValidated += validated.length;

        accum[language] = {
          submitted,
          validated,
        };
        return accum;
      }, this.state.languageInfo);

      this.setState({
        loading: false,
        languageInfo,
        totalSubmitted,
        totalValidated,
      });

    } catch (err) {
      console.error('failed loading language meta in profile', err);
      this.setState({
        loading: false,
      });
      this.setError(err);
    }
  }

  componentDidMount() {
    this.loadUserLanguageInfo();
  }

  componentDidUpdate(prevProps) {
    if (!arrayCompare(prevProps.languages, this.props.languages)) {
      this.loadUserLanguageInfo();
    }
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

        { this.props.languages && this.props.languages.length > 0 && (
          <section>
            { (this.state.totalSubmitted || this.state.totalValidated) ? (
              <ul>
                <li><strong>{this.state.totalSubmitted}</strong> sentences submitted</li>
                <li><strong>{this.state.totalValidated}</strong> sentences reviewed</li>
                <li>... across <strong>{this.props.languages.length}</strong> language(s)</li>
              </ul>
            ): (
              <p>
                No sentences submitted or validated,
                try <Link to="/review">reviewing</Link> some sentences now?
              </p>
            )}
          </section>
        )}

        { this.state.message && ( <p>{this.state.message}</p> ) }

        { this.state.error && ( <p style={ { color: 'red' } }>{this.state.error}</p> ) }

        <section>
          <p>Your languages:</p>
          { this.props.languages && this.props.languages.length > 0 ? (
            <LanguageInfo languageInfo={this.state.languageInfo}
                          languages={this.props.languages}
                          onRemove={this.onRemove} />
          ) : (
            <p>You have not added any languages yet, please add at least one below.</p>
          )}
        </section>

        <section>
          <label className="language-selector-label" htmlFor="language-selector">
            Add a language you want to contribute to
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

const LanguageInfo = (props) => (
  <ul>
  { props.languages.map((language, i) => (
    <li key={i}>
      { getLanguageName(language) }
      <button className="remove-lang" data-lang={language}
              onClick={props.onRemove} disabled={props.pending}>
        remove
      </button>
      { props.languageInfo && props.languageInfo[language] && (
        <ul>
        <li>{props.languageInfo[language].submitted.length} submitted by you.</li>
        <li>{props.languageInfo[language].validated.length} validated by you.</li>
        </ul>
      )}
    </li>
  ))}
  </ul>
);
