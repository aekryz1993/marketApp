import { useCallback, useEffect, useRef } from "react";

export const useDebounce = ({
  callback,
  delay = 500,
}: {
  callback: (...args: any) => void;
  delay?: number;
}) => {
  const timerIdRef = useRef<NodeJS.Timeout | number | null>(null);

  const debouncedCallback = useCallback(
    (...args: any) => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      timerIdRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};
