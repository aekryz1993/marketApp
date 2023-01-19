import { useCallback } from "react";

export const usePostMessage = ({
  persistRefresh,
  postMessage,
}: {
  persistRefresh: React.MutableRefObject<any>;
  postMessage: (data: {
    token?: string | null;
    expiresIn?: number | null;
  }) => void;
}) => {
  return useCallback(() => {
    if (
      persistRefresh.current.type === "done" &&
      persistRefresh.current.data?.actionType === "refresh"
    ) {
      const data = persistRefresh.current.data;
      postMessage({ token: data.token, expiresIn: data.expiresIn });
    }
  }, [postMessage, persistRefresh]);
};
