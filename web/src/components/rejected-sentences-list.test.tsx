import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';

import { renderWithLocalization } from '../../tests/test-utils';

import * as backend from '../backend';
import RejectedSentencesList from './rejected-sentences-list';

const rejectedSentences = {
  de: [
    {
      id: 1,
      sentence: 'I failed.',
    },
    {
      id: 2,
      sentence: 'I failed too.',
    },
  ],
  en: [
    {
      id: 3,
      sentence: 'I failed miserably.',
    },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();

  jest.spyOn(backend, 'sendRequest');
  (backend.sendRequest as jest.Mock).mockResolvedValue(rejectedSentences);
});

test('should render loading notice', async () => {
  (backend.sendRequest as jest.Mock).mockImplementationOnce(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });

  await act(async () => {
    await renderWithLocalization(<RejectedSentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Loading rejected sentences…')).toBeTruthy();
  });
});

test('should render error', async () => {
  const errorMessage = 'Oh no!';
  (backend.sendRequest as jest.Mock).mockRejectedValue(new Error(errorMessage));

  await act(async () => {
    await renderWithLocalization(<RejectedSentencesList />);
  });
  await waitFor(() => {
    expect(
      screen.getByText(`Error while fetching rejected sentences. Please try again.`)
    ).toBeTruthy();
  });
});

test('should render no sentences found notice', async () => {
  (backend.sendRequest as jest.Mock).mockResolvedValue({});

  await act(async () => {
    await renderWithLocalization(<RejectedSentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('No rejected sentences found!')).toBeTruthy();
  });
});

test('should render sentences', async () => {
  await act(async () => {
    await renderWithLocalization(<RejectedSentencesList />);
  });

  await waitFor(() => {
    expect(screen.getByText('de')).toBeTruthy();
    expect(screen.getByText('I failed.')).toBeTruthy();
    expect(screen.getByText('I failed too.')).toBeTruthy();
    expect(screen.getByText('I failed miserably.')).toBeTruthy();
  });
});
