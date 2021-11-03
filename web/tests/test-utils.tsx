import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createHashHistory } from 'history';

import { AppLocalizationProvider } from '../src/l10n';
import Store from '../src/store';

export const LOADING_PLACEHOLDER = 'Loading...';

export async function renderWithLocalization(component: React.ReactNode) {
  const history = createHashHistory();

  const rendered = render(
    <Store history={history}>
      <AppLocalizationProvider>
        <BrowserRouter>{component}</BrowserRouter>
      </AppLocalizationProvider>
    </Store>
  );

  await waitFor(() => {
    expect(screen.queryByText(LOADING_PLACEHOLDER)).toBe(null);
  });

  return rendered;
}
