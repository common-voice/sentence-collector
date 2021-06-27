import React from 'react';

type Props = {
  onToggleSwipeReview: (event?: unknown) => void
  onResetSkipped?: (event?: unknown) => void
  errorMessage?: string
  useSwipeReview?: boolean
}

export default function Settings({
  errorMessage,
  useSwipeReview,
  onToggleSwipeReview,
  onResetSkipped,
}: Props) {
  return (
    <section>
      <h2>Settings</h2>

      { errorMessage && (
        <p className="form-error">{errorMessage}</p>
      )}

      <section>
        <h3>Swipe Review Tool</h3>
        <p>
          Experimental: There are two different tools with which you can review sentences. The normal tool lists 5 sentences per page
          and has an approval and rejection button each. The Swiping tool displays one card at a time where you can swipe right
          or left to approve and reject sentences. Both work on Desktop, for touch interfaces we would suggest to try out
          the swiping tool.
        </p>

        {!useSwipeReview && (
          <button className="standalone" onClick={onToggleSwipeReview}>Use Swiping Review Tool</button>
        )}
        {useSwipeReview && (
          <button className="standalone" onClick={onToggleSwipeReview}>Use Normal Review Tool</button>
        )}
      </section>

      {!!onResetSkipped && (
        <section>
          <h3>Reset skipped sentences</h3>
          <p>
            You previously skipped sentences while reviewing. Resetting skipped sentences will show all skipped sentences again.
            This is independent of the language.
          </p>
          <button className="standalone" onClick={onResetSkipped}>Show all skipped sentences again</button>
        </section>
      )}
    </section>
  );
}
