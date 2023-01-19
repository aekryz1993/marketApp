import { useEffect, useRef } from "react";

export const useServiceWorker = (
  pathname: string,
  callback: (msg: MessageEvent<any>) => void
) => {
  const saveCallback = useRef(callback);
  useEffect(() => {
    saveCallback.current = callback;
  }, [callback]);

  const swRef = useRef<ServiceWorkerContainer | null>(null);

  useEffect(() => {
    swRef.current = navigator.serviceWorker;
    if (swRef.current) {
      swRef.current
        .register(pathname)
        .then(() => swRef.current?.ready)
        .then(() => {
          swRef.current?.addEventListener("message", saveCallback.current);
        });
    }

    return () => {
      swRef.current?.removeEventListener("message", saveCallback.current);
    };
  }, [pathname, saveCallback]);

  

  return swRef.current;
};
