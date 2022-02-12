import React from 'react';
import { Localized } from '@fluent/react';

type Props = {
  translationKey?: string;
  children?: React.ReactNode;
};

export default function Error({ translationKey, children }: Props) {
  if (translationKey) {
    return (
      <Localized id={translationKey}>
        <div className="error-box"></div>
      </Localized>
    );
  }

  if (children) {
    return <div className="error-box">{children}</div>;
  }

  return null;
}
