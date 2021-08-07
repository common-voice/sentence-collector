import React, { useEffect } from 'react';
import { Prompt as ReactRouterPrompt } from 'react-router-dom';

interface PromptProps {
  when: boolean;
  message: string;
}

/**
 * Wrapper around react-router Prompt adding confirmation on tab close and external navigation.
 */
export const Prompt: React.FC<PromptProps> = (props) => {
  const { when } = props;
  useEffect(() => {
    if (!when) {
      return () => null;
    }

    function listener(event: BeforeUnloadEvent) {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
    }

    window.addEventListener('beforeunload', listener);
    return () => window.removeEventListener('beforeunload', listener);
  }, [when]);

  return (
    <ReactRouterPrompt {...props}/>
  );
};
