import React from 'react';

export default function Notice({ text, level }) {
  return (<p className={`notice ${level}`}>{text}</p>);
}
