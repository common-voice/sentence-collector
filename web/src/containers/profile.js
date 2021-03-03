import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLanguage, removeLanguage } from '../actions/languages';
import { setSetting } from '../actions/settings';
import PersonalLanguageInfo from '../components/personal-language-info';
import AddLanguage from '../components/add-language-section';
import Settings from '../components/settings';

import '../../css/profile.css';

export default function Profile() {
  const { username } = useSelector((state) => state.login);
  const {
    useSwipeReview,
    errorMessage: settingsErrorMessage,
  } = useSelector((state) => state.settings);
  const {
    stats: { user: languageStats = {} },
    allLanguages,
    languages,
    pendingLanguages,
  } = useSelector((state) => state.languages);

  const [error, setError] = useState();
  const dispatch = useDispatch();

  const toggleSwipeReview = (evt) => {
    evt.preventDefault();
    dispatch(setSetting('useSwipeReview', !useSwipeReview));
  };

  const onAdd = async (event) => {
    setError('');

    try {
      event.preventDefault();
      setError('');

      const element = event.currentTarget.form.querySelector('.language-selector');
      if (!element) {
        throw new Error('No select found');
      }

      if (element.selectedIndex === 0) {
        throw new Error('Please select a language');
      }

      const language = element.options[element.selectedIndex].value;
      await dispatch(addLanguage(language));
      element.selectedIndex = 0;
    } catch (error) {
      console.error(error);
      setError(`Could not add language: ${error.message}`);
    }
  };

  const onRemove = async (event) => {
    try {
      event.preventDefault();
      setError('');

      const language = event.currentTarget.dataset.lang;
      await dispatch(removeLanguage(language));
    } catch (error) {
      console.error(error);
      setError(`Could not remove language: ${error.message}`);
    }
  };

  const extendedLanguages = languages.map((lang) => {
    const extended = allLanguages.find((extendedLang) => extendedLang.id === lang);
    return extended;
  }).filter(Boolean);

  return (
    <form>
      <h2>Profile: { username }</h2>

      <PersonalLanguageInfo
        languages={extendedLanguages}
        languageStats={languageStats}
        error={error}
        onRemove={onRemove}
        pendingLanguages={pendingLanguages}
      />

      <AddLanguage
        pendingLanguages={pendingLanguages}
        allLanguages={allLanguages}
        languages={languages}
        error={error}
        onAdd={onAdd}
      />

      <Settings
        errorMessage={settingsErrorMessage}
        useSwipeReview={useSwipeReview}
        onToggleSwipeReview={toggleSwipeReview}
      />
    </form>
  );
}
