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
};

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.activateSwipeReview = this.activateSwipeReview.bind(this);
    this.deactivateSwipeReview = this.deactivateSwipeReview.bind(this);
  }

  setMessage(message) {
    this.setState({ message });
  }

  setError(error) {
    this.setState({ error });
  }

  async loadUserLanguageInfo() {
    const { username, password, languages } = this.props;

    // No need to load langauge meta data if user hasn't added any languages.
    if (!languages || languages.length < 1) {
      return;
    }

    try {
      this.setState({
        loading: true,
        languageInfo: DEFAULT_STATE.languageInfo,
      });

      const db = new WebDB(username, password);
      const metas = await db.getLanguagesMetaForMe(languages);

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

  activateSwipeReview() {
    this.props.setSetting('useSwipeReview', true);
  }

  deactivateSwipeReview() {
    this.props.setSetting('useSwipeReview', false);
  }

  render() {
    const {
      username,
      languages,
      pending,
      settings = {},
    } = this.props;
    const { useSwipeReview } = settings;

    return (
      <form>
        <h2>Profile: { username }</h2>

        { languages && languages.length > 0 && (
          <section>
            { (this.state.totalSubmitted || this.state.totalValidated) ? (
              <ul>
                <li><strong>{this.state.totalSubmitted}</strong> sentences added</li>
                <li><strong>{this.state.totalValidated}</strong> sentences reviewed</li>
                <li>... across <strong>{this.props.languages.length}</strong> language(s)</li>
              </ul>
            ): (
              <p>
                No sentences added or reviewed,
                try <Link to="/review">reviewing</Link> some sentences now?
              </p>
            )}
          </section>
        )}

        { this.state.message && ( <p>{this.state.message}</p> ) }

        { this.state.error && ( <p style={ { color: 'red' } }>{this.state.error}</p> ) }

        <section>
          <p>Your languages:</p>
          { languages && languages.length > 0 ? (
            <LanguageInfo languageInfo={this.state.languageInfo}
                          languages={languages}
                          onRemove={this.onRemove} />
          ) : (
            <p>You have not added any languages yet, please add at least one below.</p>
          )}
        </section>

        <section>
          <label className="language-selector-label" htmlFor="language-selector">
            Add a language you want to contribute to
          </label>
          <LanguageSelector disabled={pending}
                            name="language-selector"
                            filters={languages} />
          <button disabled={pending}
                  onClick={this.onAdd} className="add-language">Add</button>
        </section>

        <section>
          <h2>Settings</h2>
          <p>Experimental: There are two different tools with which you can review sentences. The normal tool lists 5 sentences per page
          and has an approval and rejection button each. The Swiping tool displays one card at a time and you can swipe left
          and right to approve and reject sentences. Both work on Desktop, for touch interfaces we would suggest to try out
          the swiping tool.</p>
          {!useSwipeReview && (
            <button onClick={this.activateSwipeReview}>Use Swiping Review Tool</button>
          )}
          {useSwipeReview && (
            <button onClick={this.deactivateSwipeReview}>Use Normal Review Tool</button>
          )}
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
        <li>{props.languageInfo[language].submitted.length} added by you.</li>
        <li>{props.languageInfo[language].validated.length} reviewed by you.</li>
        </ul>
      )}
    </li>
  ))}
  </ul>
);
