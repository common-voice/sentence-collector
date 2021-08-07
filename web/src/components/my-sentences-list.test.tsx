import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  jest.resetAllMocks();

  jest.spyOn(backend, 'sendRequest');
  (backend.sendRequest as jest.Mock).mockResolvedValue(sentences);
});

test('should render loading notice', async () => {
  (backend.sendRequest as jest.Mock).mockImplementation(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });

  act(() => {
    render(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Loading your sentences..')).toBeTruthy();
  });
});

test('should render error', async () => {
  const errorMessage = 'Oh no!';
  (backend.sendRequest as jest.Mock).mockRejectedValue(new Error(errorMessage));

  act(() => {
    render(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Error while fetching your sentences. Please try again.')).toBeTruthy();
  });
});

test('should render no sentences found notice', async () => {
  (backend.sendRequest as jest.Mock).mockResolvedValue({});

  act(() => {
    render(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('No sentences found!')).toBeTruthy();
  });
});

test('should render sentences', async () => {
  act(() => {
    render(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('de')).toBeTruthy();
    expect(screen.getByText('Submission: 1')).toBeTruthy();
    expect(screen.getByText('Source: foo')).toBeTruthy();
    expect(screen.getByText('I failed.')).toBeTruthy();
    expect(screen.getByText('I failed too.')).toBeTruthy();
  });
});

test('should render delete button', async () => {
  act(() => {
    render(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Delete selected sentences')).toBeTruthy();
  });
});

test('should not render delete button if no sentences', async () => {
  (backend.sendRequest as jest.Mock).mockResolvedValue({});

  act(() => {
    render(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.queryByText('Delete selected sentences')).toBeNull();
  });
});

test('should render delete loading notice', async () => {
  (backend.sendRequest as jest.Mock).mockResolvedValueOnce(sentences).mockImplementationOnce(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });

  act(() => {
    render(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Delete selected sentences')).toBeTruthy();
  });

  await userEvent.click(screen.getByText('Delete selected sentences'));
  await waitFor(() => {
    expect(screen.getByText('Deleting selected sentences...')).toBeTruthy();
  });
});

test('should delete correct sentences', async () => {
  (backend.sendRequest as jest.Mock).mockResolvedValueOnce(sentences).mockResolvedValueOnce({});

  act(() => {
    render(<MySentencesList />);
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

  act(() => {
    render(<MySentencesList />);
  });
  await waitFor(() => {
    expect(screen.getByText('Delete selected sentences')).toBeTruthy();
  });

  await userEvent.click(screen.getByText('Delete selected sentences'));
  await waitFor(() => {
    expect(
      screen.getByText('Failed to delete selected sentences.. Please try again!')
    ).toBeTruthy();
  });
});
