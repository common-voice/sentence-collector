import React from 'react';

import LanguageSelector from './language-selector';

export default function AddLanguage({ allLanguages, onAdd, error, languages, pendingLanguages }) {
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
