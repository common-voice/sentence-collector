import React from 'react';
import { Localized } from '@fluent/react';

type Props = {
  children?: React.ReactNode;
  translationKey?: string;
  vars?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export default function Success({ translationKey, vars, children }: Props) {
  const hasVars = vars && Object.keys(vars).length > 0;
  if (translationKey && !hasVars) {
    return (
      <Localized id={translationKey}>
        <div className="success box"></div>
      </Localized>
    );
  }

  if (translationKey && hasVars) {
    return (
      <Localized id={translationKey} vars={vars}>
        <div className="success box"></div>
      </Localized>
    );
  }

  if (children) {
    return <div className="success box">{children}</div>;
  }

  return null;
}
