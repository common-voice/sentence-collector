import React from 'react';

export default function PersonalLanguageInfo(props) {
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
