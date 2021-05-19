import React, { useState } from 'react';

import { Language, PersonalLanguageStatsEntry } from '../types';

type Props = {
  languages: Language[]
  onRemove: (language: string) => void
  languageStats: Record<string, PersonalLanguageStatsEntry>
  pendingLanguages?: boolean
}

export default function PersonalLanguageInfo({ languages, onRemove, languageStats, pendingLanguages }: Props) {
  const [error, setError] = useState('');

  const onLanguageRemove = async (language) => {
    if (!language) {
      setError('Could not remove language: language not found');
      return;
    }

    try {
      setError('');
      await onRemove(language);
    } catch (error) {
      setError(`Could not remove language: ${error.message}`);
    }
  };

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
              <button className="remove-lang"
                      onClick={() => onLanguageRemove(language.id)}
                      disabled={pendingLanguages}>
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
