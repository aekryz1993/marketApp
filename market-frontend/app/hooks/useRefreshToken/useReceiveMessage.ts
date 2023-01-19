import type { TListenEventCallback } from "../useBroadcastChannel";

import { useCallback, useSyncExternalStore } from "react";

import { clearTimeoutIfExist } from ".";

export interface MessageData {
  token?: string | null;
  reload?: boolean;
  pathname?: string;
  fromController?: boolean;
}

export const useReceiveMessage = ({
  subscribeMessage,
  persistRefresh,
  timerId,
}: {
  subscribeMessage: TListenEventCallback;
  persistRefresh: React.MutableRefObject<any>;
  timerId: React.MutableRefObject<number | NodeJS.Timeout | null>;
}) => {
  const callback = useCallback(
    (
      event: MessageEvent<{
        token: string | null;
        expiresIn: number | null;
      }>
    ) => {
      clearTimeoutIfExist(timerId);
      persistRefresh.current.submit(
        { token: event.data.token, expiresIn: event.data.expiresIn },
        { action: "action/sync-refresh-token", method: "post" }
      );
    },
    [persistRefresh, timerId]
  );

  useSyncExternalStore(
    () => subscribeMessage(callback),
    () => {},
    () => true
  );
};
