import { useCallback, useEffect, useRef } from "react";

export const useDebounce = ({
  callbackHook,
  delay = 500,
}: {
  callbackHook?: (...args: any) => void;
  delay?: number;
}) => {
  const timerIdRef = useRef<NodeJS.Timeout | number | null>(null);

  const debouncedCallback = useCallback(
    ({ callback }: { callback?: (...args: any) => void }, ...args: any) => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      timerIdRef.current = setTimeout(() => {
        callbackHook ? callbackHook(...args) : callback?.(...args);
      }, delay);
    },
    [callbackHook, delay]
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
