import React from 'react';

import Header from '../components/header';
import Footer from '../components/footer';

type Props = {
  children?: React.ReactNode
}

export default function Page({ children }: Props) {
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
