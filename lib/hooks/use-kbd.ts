"use client";

import { useEffect, useCallback } from 'react';

/**
 * A custom hook to handle keyboard shortcuts.
 * @param callback The function to execute when the shortcut is pressed.
 * @param keys An array of keys that trigger the callback (e.g., ['k']).
 */
export function useKbd(callback: () => void, keys: string[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      // Check for Cmd on Mac and Ctrl on other OSes
      if ((event.metaKey || event.ctrlKey) && keys.includes(key)) {
        event.preventDefault();
        callback();
      }
    },
    [callback, keys]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
