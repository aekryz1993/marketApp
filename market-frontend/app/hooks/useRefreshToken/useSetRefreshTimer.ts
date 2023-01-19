import { useCallback } from "react";

export const useSetRefreshTimer = ({
  persistRefresh,
  token,
}: {
  persistRefresh: React.MutableRefObject<any>;
  token?: string | null;
}) => {
  const setTimer = useCallback(
    (timerId: React.MutableRefObject<number | NodeJS.Timeout | null>, expiresIn: number) => {
      timerId.current = setTimeout(() => {
        persistRefresh.current.submit(
          { token },
          { action: "action/refresh-token", method: "post" }
        );
      }, expiresIn - Date.now() - 15 * 1000);
    },
    [persistRefresh, token]
  );

  return setTimer;
};
