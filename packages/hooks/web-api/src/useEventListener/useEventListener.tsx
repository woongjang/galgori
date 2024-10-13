import { RefObject, useEffect } from 'react';
import { isBrowser } from '../util';

interface UseEventListenerType {
  handler: () => Promise<void> | void;
  eventNames: (keyof WindowEventMap)[];
  target?: RefObject<HTMLElement | null>;
  options?: AddEventListenerOptions;
}

export const useEventListener = ({
  handler,
  eventNames,
  target,
  options,
}: UseEventListenerType) => {
  if (!isBrowser) return;

  const innerTarget = target?.current || window;

  useEffect(() => {
    eventNames.forEach((eventName) => {
      innerTarget.addEventListener(eventName, handler, options);
    });

    return () => {
      eventNames.forEach((eventName) => {
        innerTarget.removeEventListener(eventName, handler, options);
      });
    };
  }, [innerTarget]);
};
