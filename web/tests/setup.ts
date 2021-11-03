import fs from 'fs';
import path from 'path';
import fetchMock from 'fetch-mock';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.WebKitCSSMatrix = function () {
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

const ftlContent = fs
  .readFileSync(path.resolve(__dirname, '../locales/en/sentence-collector.ftl'))
  .toString();

fetchMock.get('locales/en/sentence-collector.ftl', ftlContent);
fetchMock.get('*', {});
