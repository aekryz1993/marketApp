import { useFetcher } from "@remix-run/react";

import { useCallbackRef } from "./useCallbackRef";

export const useSaveFetcherRef = () => {
  const fetcher = useFetcher();
  const saveFetcher = useCallbackRef(fetcher);

  return saveFetcher;
};
