import React from 'react';
import { useSelector } from 'react-redux';

import PersonalLanguageInfo from '../components/personal-language-info';
import AddLanguage from '../components/add-language-section';
import Settings from '../components/settings';

import '../../css/profile.css';

export default function Profile() {
  const { username } = useSelector((state) => state.login);

  return (
    <form>
      <h2>Profile: { username }</h2>

      <PersonalLanguageInfo/>
      <AddLanguage/>
      <Settings/>
    </form>
  );
}
