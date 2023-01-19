import { useCallback } from "react";

export const useHandleScroll = () => {
  const handleReachEndScroll = useCallback(
    (event: React.UIEvent<HTMLElement, UIEvent>) => {
      const element = event.target as HTMLElement;
      return (
        element.scrollTop > element.scrollHeight - element.clientHeight * 3 && element.scrollTop < element.scrollHeight - element.clientHeight
      );
    },
    []
  );

  return { handleReachEndScroll };
};
