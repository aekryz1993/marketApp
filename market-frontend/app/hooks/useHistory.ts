import { useEffect, useRef } from "react";
import { createBrowserHistory } from "history";

export const useHistory = () => {
  const historyRef = useRef(
    typeof window !== "undefined" ? createBrowserHistory() : undefined
  );

  useEffect(() => {
    if (!historyRef.current) historyRef.current = createBrowserHistory();
  }, []);

  return historyRef;
};