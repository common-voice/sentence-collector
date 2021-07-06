import React from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../types';

import PersonalLanguageInfo from './personal-language-info';
import AddLanguage from './add-language-section';
import Settings from './settings';

import '../../css/profile.css';

export default function Profile() {
  const { username } = useSelector((state: RootState) => state.login);

  return (
    <form>
      <h1>Profile: { username }</h1>

      <PersonalLanguageInfo />
      <AddLanguage />
      <Settings />
    </form>
  );
}
