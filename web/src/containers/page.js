import React from 'react';

import Header from '../components/header';

export default function Page({ children }) {
  return (
    <div id="page" key="page">
      <Header key="header" />
      <main key="main">
        {children}
      </main>
    </div>
  );
}
