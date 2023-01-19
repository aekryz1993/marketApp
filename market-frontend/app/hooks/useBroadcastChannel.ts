import { useCallback, useMemo } from "react";

export type TListenEventCallback = (callback: (data?: any) => void) => any;

export const useBroadcastChannel = (name: string) => {
  const broadcastChannel = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return new BroadcastChannel(name);
  }, [name]);

  const postMessage = useCallback(
    (data: any) => {
      broadcastChannel?.postMessage(data);
    },
    [broadcastChannel]
  );

  const subscribeMessage = useCallback(
    (callback: (data?: any) => void) => {
      broadcastChannel?.addEventListener("message", callback);
      return () => {
        broadcastChannel?.removeEventListener("message", callback);
      };
    },
    [broadcastChannel]
  );

  return {
    postMessage,
    subscribeMessage,
    broadcastChannel,
  };
};
