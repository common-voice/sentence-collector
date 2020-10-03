import React, { useState } from 'react';

import Header from './header';
import HeaderBtn from './header-btn';

export default function Page({ children }) {
  const [headerIsOpen, setHeaderShown] = useState(true);
  const toggleHeader = () => { setHeaderShown(!headerIsOpen); };

  const elements = [
    <div id="page" key="page">
      <HeaderBtn isOpen={headerIsOpen} handleClick={toggleHeader} />
      <main key="main">
        {children}
      </main>
    </div>
  ];

  if (headerIsOpen) {
    elements.unshift(<Header key="header" />);
  }

  return elements;
}
