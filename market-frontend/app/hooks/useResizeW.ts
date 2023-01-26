import { useCallback, useEffect, useState } from "react";
import { useThrottle } from "./useThrottle";

export const useResizeW = () => {
  const [sizeW, setSize] = useState<number | undefined>(undefined);

  const handleResize = useCallback((event: UIEvent) => {
    const targetWindow = event.target as Window;
    setSize(targetWindow.innerWidth);
  }, []);

  const throttledCallback = useThrottle(handleResize, 1000, {});

  useEffect(() => {
    setSize(window.innerWidth);
    window.addEventListener("resize", throttledCallback);
    return () => window.removeEventListener("resize", throttledCallback);
  }, [throttledCallback]);

  return sizeW;
};
