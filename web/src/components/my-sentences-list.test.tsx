import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithLocalization } from '../../tests/test-utils';

import * as backend from '../backend';
import MySentencesList from './my-sentences-list';

const sentences = {
  de: {
    '1': {
      source: 'foo',
      sentences: [
        {
          id: 1,
          sentence: 'I failed.',
        },
        {
          id: 2,
          sentence: 'I failed too.',
        },
      ],
    },
  },
};

beforeEach(() => {
  jest.clearAllMocks();

  jest.spyOn(backend, 'sendRequest');
  (backend.sendRequest as jest.Mock).mockResolvedValue(sentences);
});

test('should render loading notice', async () => {
  (backend.sendRequest as jest.Mock).mockImplementation(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });

  await act(async () => {
    await renderWithLocalization(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Loading your sentences…')).toBeTruthy();
  });
});

test('should render error', async () => {
  const errorMessage = 'Oh no!';
  (backend.sendRequest as jest.Mock).mockRejectedValue(new Error(errorMessage));

  await act(async () => {
    await renderWithLocalization(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Error while fetching your sentences. Please try again.')).toBeTruthy();
  });
});

test('should render no sentences found notice', async () => {
  (backend.sendRequest as jest.Mock).mockResolvedValue({});

  await act(async () => {
    await renderWithLocalization(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('No sentences found!')).toBeTruthy();
  });
});

test('should render sentences', async () => {
  await act(async () => {
    await renderWithLocalization(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Submission: \u20681\u2069')).toBeTruthy();
    expect(screen.getByText('Source: \u2068foo\u2069')).toBeTruthy();
    expect(screen.getByText('I failed.')).toBeTruthy();
    expect(screen.getByText('I failed too.')).toBeTruthy();
  });
});

test('should render delete button', async () => {
  await act(async () => {
    await renderWithLocalization(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Delete selected sentences')).toBeTruthy();
  });
});

test('should not render delete button if no sentences', async () => {
  (backend.sendRequest as jest.Mock).mockResolvedValue({});

  await act(async () => {
    await renderWithLocalization(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.queryByText('Delete selected sentences')).toBeNull();
  });
});

test('should delete correct sentences', async () => {
  (backend.sendRequest as jest.Mock).mockResolvedValueOnce(sentences).mockResolvedValueOnce({});

  await act(async () => {
    await renderWithLocalization(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('I failed.')).toBeTruthy();
  });

  await userEvent.click(screen.getByText('I failed.'));
  await userEvent.click(screen.getByText('I failed too.')); // select
  await userEvent.click(screen.getByText('I failed too.')); // unselect
  await userEvent.click(screen.getByText('Delete selected sentences'));
  await waitFor(() => {
    expect(backend.sendRequest).toHaveBeenNthCalledWith(2, 'sentences/delete', 'POST', {
      sentences: [1],
    });
  });
});

test('should render delete error', async () => {
  (backend.sendRequest as jest.Mock)
    .mockResolvedValueOnce(sentences)
    .mockRejectedValueOnce(new Error('oh no!'));

  await act(async () => {
    await renderWithLocalization(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Delete selected sentences')).toBeTruthy();
  });

  await userEvent.click(screen.getByText('Delete selected sentences'));
  await waitFor(() => {
    expect(screen.getByText('Failed to delete selected sentences… Please try again!')).toBeTruthy();
  });
});
