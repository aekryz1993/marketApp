import { useCallback, useEffect } from "react";

import { Theme } from "~/context/theme";

import type { TListenEventCallback } from "./useBroadcastChannel";

export const useThemeBroadcastChannel = ({
  subscribeMessage,
  setTheme,
}: {
  subscribeMessage: TListenEventCallback;
  setTheme: React.Dispatch<React.SetStateAction<Theme | null>>;
}) => {
  const callback = useCallback(() => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  }, [setTheme]);

  useEffect(() => {
    subscribeMessage(callback);
  }, [callback, subscribeMessage]);
};
