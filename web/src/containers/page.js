import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

export default function Page({ children }) {
  return (
    <React.Fragment>
      <Header key="header" />
      <main key="main">
        {children}
      </main>
      <Footer key="footer" />
    </React.Fragment>
  );
}
