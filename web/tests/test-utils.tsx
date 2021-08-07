import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';


export function renderWithBrowserRouter(component: React.ReactNode) {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
}
