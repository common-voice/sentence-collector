import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLanguage } from '../actions/languages';
import LanguageSelector from './language-selector';

export default function AddLanguage() {
  const {
    allLanguages,
    languages,
    pendingLanguages,
  } = useSelector((state) => state.languages);
  const [error, setError] = useState();
  const dispatch = useDispatch();

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

  return (
    <section>
      { error && ( <p className="error-message">{error}</p> ) }

      <LanguageSelector disabled={pendingLanguages}
                        name="language-selector"
                        languages={allLanguages}
                        filters={languages}
                        labelText="Add a language you want to contribute to" />
      <button disabled={pendingLanguages}
              onClick={onAdd} className="add-language">Add</button>
    </section>
  );
}
