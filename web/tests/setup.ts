const { ReactNode } = require('react');

require('jest-fetch-mock').enableMocks();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
WebKitCSSMatrix = function () {
  this.a = 1;
  this.b = 0;
  this.c = 0;
  this.d = 1;
  this.e = 0;
  this.f = 0;
  this.is2D = true;
  this.isIdentity = true;
  this.m11 = 1;
  this.m12 = 0;
  this.m13 = 0;
  this.m14 = 0;
  this.m21 = 0;
  this.m22 = 1;
  this.m23 = 0;
  this.m24 = 0;
  this.m31 = 0;
  this.m32 = 0;
  this.m33 = 1;
  this.m34 = 0;
  this.m41 = 0;
  this.m42 = 0;
  this.m43 = 0;
  this.m44 = 1;
};

type PropType = { children: typeof ReactNode };
jest.mock('@fluent/react', () => ({
  ...jest.requireActual('@fluent/react'),
  Localized: ({ children }: PropType) => children,
}));
jest.mock('../src/l10n.tsx', () => ({
  ...jest.requireActual('../src/l10n.tsx'),
  AppLocalizationProvider: ({ children }: PropType) => children,
}));
