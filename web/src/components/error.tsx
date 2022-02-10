import React from 'react';
import { Localized } from '@fluent/react';

export default function Footer({ translationKey }: { translationKey: string }) {
  return (
    <Localized id={translationKey}>
      <div className="error-box"></div>
    </Localized>
  );
}
