import React from 'react';

export default function PersonalLanguageInfo({ languages, error, onRemove, languageStats, pendingLanguages }) {
  return (
    <section>
      { error && ( <p className="error-message">{error}</p> ) }

      { languages && languages.length > 0 ? (
        <section>
          <p>Your languages:</p>
          <ul>
          { languages.map((language, i) => (
            <li key={i}>
              { language.nativeName } ({ language.name })
              <button className="remove-lang" data-lang={language.id}
                      onClick={onRemove} disabled={pendingLanguages}>
                remove
              </button>
              <ul>
                <li>{`${(languageStats[language.id] || {}).added || 0} added by you`}</li>
              </ul>
            </li>
          ))}
          </ul>
        </section>
      ) : (
        <p>You have not added any languages yet.</p>
      )}
    </section>
  );
}
