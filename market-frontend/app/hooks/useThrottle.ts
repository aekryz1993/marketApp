import { useCallback, useEffect, useMemo, useRef } from "react";

export const useThrottle = (
  delay: number = 500,
  {
    leading = true,
    trailing = true,
  }: {
    leading?: boolean;
    trailing?: boolean;
  },
  callbackHook?: (...args: any) => void
) => {
  const timerIdRef = useRef<NodeJS.Timeout | number | null>(null);
  const flagRef = useRef(true);

  const options = useMemo(
    () => ({
      leading,
      trailing,
    }),
    [leading, trailing]
  );

  const throttledCallback = useCallback(
    ({ callback }: { callback?: (...args: any) => void }, ...args: any) => {
      if (flagRef.current) {
        flagRef.current = false;
        if (options.leading)
          callbackHook ? callbackHook(...args) : callback?.(...args);
        timerIdRef.current = setTimeout(() => {
          if (options.trailing)
            callbackHook ? callbackHook(...args) : callback?.(...args);
          flagRef.current = true;
        }, delay);
      }
    },
    [callbackHook, delay, options]
  );

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        flagRef.current = true;
      }
    };
  }, []);

  return throttledCallback;
};
