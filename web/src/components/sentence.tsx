import React from 'react';

type Props = {
  children: React.ReactNode
  language?: string
}

export default function Sentence({ children: text, language = 'en' }: Props) {
  return (
    <p dir="auto" lang={language} translate="no">
      {text}
    </p>
  );
}
