import React from 'react';

export function useOnClickOutside(
  ref: React.MutableRefObject<any>,
  handler: (event: MouseEvent | TouchEvent) => any
) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // If there's no ref (the component hasn't completely mounted yet)
      // or the element which has the ref was clicked return.
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // Call the handler passed into the hook.
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
