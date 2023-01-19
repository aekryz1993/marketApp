import { useCallback, useEffect, useMemo, useRef } from "react";

export const useThrottle = (
  callback: (...args: any) => void,
  delay: number = 500,
  {
    leading = true,
    trailing = true,
  }: {
    leading?: boolean;
    trailing?: boolean;
  }
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
    (...args: any) => {
      if (flagRef.current) {
        flagRef.current = false;
        if (options.leading) callback(...args);
        timerIdRef.current = setTimeout(() => {
          if (options.trailing) callback(...args);
          flagRef.current = true;
        }, delay);
      }
    },
    [callback, delay, options]
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
