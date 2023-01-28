import type { TAuthInfo } from "~/types/data";

import { useCallback, useEffect, useRef } from "react";

import { useSetRefreshTimer } from "./useSetRefreshTimer";
import { usePostMessage } from "./usePostMessage";
import { useBroadcastChannel } from "../useBroadcastChannel";
import { useReceiveMessage } from "./useReceiveMessage";
import { useSaveFetcherRef } from "../useFetcherRef";

export const useRefreshToken = (authInfo: TAuthInfo | null) => {
  const timerId = useRef<NodeJS.Timeout | number | null>(null);

  const { postMessage, subscribeMessage } =
    useBroadcastChannel("refresh_token");

  const persistRefresh = useSaveFetcherRef();

  const postDataToOtherClientTabs = usePostMessage({
    persistRefresh,
    postMessage,
  });

  useReceiveMessage({
    persistRefresh,
    subscribeMessage,
    timerId,
  });

  const setRefreshTimer = useSetRefreshTimer({
    persistRefresh,
    token: authInfo?.token,
  });

  const isHiddenClient =
    typeof window !== "undefined" && window.document && window.document.hidden;

  const getExpiresIn = useCallback(() => {
    if (!timerId.current && authInfo?.token && !isHiddenClient)
      return authInfo?.expiresIn;
    return null;
  }, [authInfo?.expiresIn, authInfo?.token, isHiddenClient]);

  useEffect(() => {
    const expiresIn = getExpiresIn();
    if (expiresIn) {
      setRefreshTimer(timerId, expiresIn ?? 0);
    }
    postDataToOtherClientTabs();
    return () => {
      clearTimeoutIfExist(timerId);
    };
  }, [getExpiresIn, postDataToOtherClientTabs, setRefreshTimer]);
};

export const clearTimeoutIfExist = (
  timerId: React.MutableRefObject<number | NodeJS.Timeout | null>
) => {
  if (timerId.current) {
    clearTimeout(timerId.current);
    timerId.current = null;
  }
};
