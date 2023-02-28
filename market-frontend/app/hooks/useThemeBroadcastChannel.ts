import { useCallback, useEffect } from "react";

import type { TListenEventCallback } from "./useBroadcastChannel";

export const useThemeBroadcastChannel = ({
  subscribeMessage,
  handleThemeChange,
}: {
  subscribeMessage: TListenEventCallback;
  handleThemeChange: () => void
}) => {
  const callback = useCallback(() => {
    handleThemeChange()
  }, [handleThemeChange]);

  useEffect(() => {
    subscribeMessage(callback);
  }, [callback, subscribeMessage]);
};
