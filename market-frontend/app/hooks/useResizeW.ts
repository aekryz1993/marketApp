import { useSyncExternalStore } from "react";
import { useThrottle } from "./useThrottle";

function subscribe(throttledCallback: any) {
  window.addEventListener("resize", throttledCallback);
  return () => window.removeEventListener("resize", throttledCallback);
}

function getSnapshot() {
  return window.innerWidth;
}

export const useResizeW = () => {
  const throttledCallback = useThrottle(1000, {});

  return useSyncExternalStore(
    (callback) => subscribe(() => throttledCallback({ callback })),
    getSnapshot,
    () => undefined
  );
};
