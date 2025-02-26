import { useCallback, useRef } from 'react';
import { MedicationForm } from '../types';

export function useFormPerformance() {
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const throttleTimerRef = useRef<NodeJS.Timeout>();
  const lastUpdateRef = useRef<number>(0);

  const debouncedUpdate = useCallback((
    callback: () => void,
    delay: number = 300
  ) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, []);

  const throttledUpdate = useCallback((
    callback: () => void,
    limit: number = 300
  ) => {
    const now = Date.now();

    if (!throttleTimerRef.current && (now - lastUpdateRef.current) >= limit) {
      callback();
      lastUpdateRef.current = now;
    } else {
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
      }

      throttleTimerRef.current = setTimeout(() => {
        callback();
        lastUpdateRef.current = Date.now();
        throttleTimerRef.current = undefined;
      }, limit);
    }
  }, []);

  const memoizedFormData = useCallback((formData: MedicationForm) => {
    return JSON.stringify(formData);
  }, []);

  return {
    debouncedUpdate,
    throttledUpdate,
    memoizedFormData,
  };
}