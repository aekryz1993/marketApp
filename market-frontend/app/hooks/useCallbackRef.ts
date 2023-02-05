import { useEffect, useRef } from "react";

export const useCallbackRef = <TCallback>(callback: TCallback) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
};