import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event | KeyboardEvent) => void,
  key: string = 'Escape'
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref.current;
      if (el && !el.contains(event.target as Node)) {
        handler(event);
      }
    };

    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === key) {
        handler(e);
      }
    };

    if (ref.current) {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      document.addEventListener('keydown', escapeHandler);
    }

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
      document.removeEventListener('keydown', escapeHandler);
    };
  }, [ref, handler, key]);
};
