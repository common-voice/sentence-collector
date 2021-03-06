import React from 'react';
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

  const dispatch = useDispatch();

  const toggleSwipeReview = (evt) => {
    evt.preventDefault();
    dispatch(setSetting('useSwipeReview', !useSwipeReview));
  };

  const onAdd = async (language) => {
    await dispatch(addLanguage(language));
  };

  const onRemove = async (language) => {
    await dispatch(removeLanguage(language));
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
        onRemove={onRemove}
        pendingLanguages={pendingLanguages}
      />

      <AddLanguage
        pendingLanguages={pendingLanguages}
        allLanguages={allLanguages}
        languages={languages}
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
