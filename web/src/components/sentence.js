import React from 'react';

export default function Sentence({ children: text, language }) {
  return (
    <p dir="auto" lang={language} translate="no">
      {text}
    </p>
  );
}
