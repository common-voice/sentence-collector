import React from 'react';
import { useSelector } from 'react-redux';
import { Localized } from '@fluent/react';

import type { RootState } from '../types';

import PersonalLanguageInfo from './personal-language-info';
import AddLanguage from './add-language-section';
import Settings from './settings';

import '../../css/profile.css';

export default function Profile() {
  const { username } = useSelector((state: RootState) => state.login);

  return (
    <form>
      <Localized id="sc-profile-title" vars={{ username }}>
        <h1></h1>
      </Localized>

      <PersonalLanguageInfo />
      <AddLanguage />
      <Settings />
    </form>
  );
}
