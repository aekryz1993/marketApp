import { useCallback, useEffect } from "react";

export const useListenForOutsideClicks = ({
  handleClose,
  isOpened,
  containerRef,
  exceptedElementRef,
}: {
  handleClose: () => void;
  isOpened: boolean;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  exceptedElementRef?: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const handleCloseEvent = useCallback(
    (event: any) => {
      const dropdown = containerRef.current;
      const exceptedElement = exceptedElementRef?.current;
      const target = event.target;
      
      if (dropdown?.contains(target) || exceptedElement?.isEqualNode(target))
        return;

      handleClose();
    },
    [containerRef, exceptedElementRef, handleClose]
  );

  useEffect(() => {
    if (!isOpened) {
      document.removeEventListener("click", handleCloseEvent);
    } else {
      document.addEventListener("click", handleCloseEvent);
    }

    return () => {
      document.removeEventListener("click", handleCloseEvent);
    };
  }, [handleCloseEvent, isOpened]);
};
