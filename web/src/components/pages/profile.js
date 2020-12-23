import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLanguage, removeLanguage } from '../../actions/languages';
import { setSetting } from '../../actions/settings';
import LanguageSelector from '../language-selector';

import '../../../css/profile.css';

export default function Profile() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.login);
  const {
    stats: { user: languageStats = {} },
    allLanguages,
    languages,
    pendingLanguages: pending,
  } = useSelector((state) => state.languages);
  const { useSwipeReview, errorMessage } = useSelector((state) => state.settings);
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const onAdd = async (evt) => {
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
      await dispatch(addLanguage(language));
      el.selectedIndex = 0;
      setMessage(`Language added: ${language}`);
    } catch (error) {
      console.error(error);
      setError(`Could not add language: ${error.message}`);
    }
  };

  const onRemove = async (evt) => {
    try {
      evt.preventDefault();
      const language = evt.currentTarget.dataset.lang;
      await dispatch(removeLanguage(language));
      setMessage(`Language removed: ${language}`);
    } catch (error) {
      console.error(error);
      setError(`Could not remove language: ${error.message}`);
    }
  };

  const toggleSwipeReview = (evt) => {
    evt.preventDefault();
    dispatch(setSetting('useSwipeReview', !useSwipeReview));
  };

  return (
    <form>
      <h2>Profile: { username }</h2>

      { message && ( <p>{message}</p> ) }
      { error && ( <p style={ { color: 'red' } }>{error}</p> ) }

      <section>
        <p>Your languages:</p>
        { languages && languages.length > 0 ? (
          <PersonalLanguageInfo languageStats={languageStats}
                                allLanguages={allLanguages}
                                languages={languages}
                                onRemove={onRemove} />
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
                onClick={onAdd} className="add-language">Add</button>
      </section>

      <section>
        <h2>Settings</h2>
        {errorMessage && (
          <p className="form-error">{errorMessage}</p>
        )}
        <p>
          Experimental: There are two different tools with which you can review sentences. The normal tool lists 5 sentences per page
          and has an approval and rejection button each. The Swiping tool displays one card at a time where you can swipe right
          or left to approve and reject sentences. Both work on Desktop, for touch interfaces we would suggest to try out
          the swiping tool.
        </p>
        {!useSwipeReview && (
          <button onClick={toggleSwipeReview}>Use Swiping Review Tool</button>
        )}
        {useSwipeReview && (
          <button onClick={toggleSwipeReview}>Use Normal Review Tool</button>
        )}
      </section>
    </form>
  );
}

function PersonalLanguageInfo(props) {
  const {
    languages,
    allLanguages,
    onRemove,
    pending,
    languageStats,
  } = props;

  const extendedLanguages = languages.map((lang) => {
    const extended = allLanguages.find((extendedLang) => extendedLang.id === lang);
    return extended;
  }).filter(Boolean);

  return (
    <ul>
    { extendedLanguages.map((language, i) => (
      <li key={i}>
        { language.nativeName } ({ language.name })
        <button className="remove-lang" data-lang={language.id}
                onClick={onRemove} disabled={pending}>
          remove
        </button>
        <ul>
          <li>{(languageStats[language.id] || {}).added || 0} added by you</li>
        </ul>
      </li>
    ))}
    </ul>
  );
}
