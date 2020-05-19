import React from 'react';
import { connect } from 'react-redux';

import { addLanguage, removeLanguage } from '../../actions/languages';
import { setSetting } from '../../actions/settings';
import LanguageSelector from '../language-selector';

import '../../../css/profile.css';

const DEFAULT_STATE = {};

class Profile extends React.Component {
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
      this.setMessage('Language added: ' + language);
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
      this.setMessage('Language removed: ' + language);
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
      allLanguages = [],
      languageStats,
      pending,
      settings,
    } = this.props;
    const { useSwipeReview } = settings;

    return (
      <form>
        <h2>Profile: { username }</h2>

        { this.state.message && ( <p>{this.state.message}</p> ) }
        { this.state.error && ( <p style={ { color: 'red' } }>{this.state.error}</p> ) }

        <section>
          <p>Your languages:</p>
          { languages && languages.length > 0 ? (
            <PersonalLanguageInfo languageStats={languageStats}
                                  allLanguages={allLanguages}
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
                            languages={allLanguages}
                            filters={languages} />
          <button disabled={pending}
                  onClick={this.onAdd} className="add-language">Add</button>
        </section>

        <section>
          <h2>Settings</h2>
          {settings.errorMessage && (
            <p className="form-error">{settings.errorMessage}</p>
          )}
          <p>
            Experimental: There are two different tools with which you can review sentences. The normal tool lists 5 sentences per page
            and has an approval and rejection button each. The Swiping tool displays one card at a time where you can swipe right
            or left to approve and reject sentences. Both work on Desktop, for touch interfaces we would suggest to try out
            the swiping tool.
          </p>
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

const PersonalLanguageInfo = (props) => {
  const extendedLanguages = props.languages.map((lang) => {
    const extended = props.allLanguages.find((extendedLang) => extendedLang.id === lang);
    return extended;
  });

  return (
    <ul>
    { extendedLanguages.map((language, i) => (
      <li key={i}>
        { language.nativeName } ({ language.name })
        <button className="remove-lang" data-lang={language.id}
                onClick={props.onRemove} disabled={props.pending}>
          remove
        </button>
        { props.languageStats && props.languageStats[language.name] && (
          <ul>
            <li>{props.languageStats[language.name].added || 0} added by you</li>
            <li>of which {props.languageStats[language.name].validated || 0} got validated</li>
          </ul>
        )}
      </li>
    ))}
    </ul>
  );
};

function mapStateToProps(state) {
  return {
    username: state.login.username,
    languageStats: state.languages.stats && state.languages.stats.user,
    allLanguages: state.languages.allLanguages,
    languages: state.languages.languages,
    pending: state.languages.pendingLanguages,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLanguage: (language) => dispatch(addLanguage(language)),
    removeLanguage: (language) => dispatch(removeLanguage(language)),
    setSetting: (key, value) => dispatch(setSetting(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
