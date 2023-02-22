import clsx from "clsx";
import { useCallback, useRef } from "react";

import { useToggleSidebar } from "~/context/sidebar";
import {
  closedSidebarClasses,
  containerClasses,
  toggledContainerClasses,
} from "./styled";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";

export const ToggledSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpened, setIsOpen] = useToggleSidebar();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useListenForOutsideClicks({ isOpened, handleClose, containerRef });

  return (
    <div
      className={clsx(
        containerClasses,
        toggledContainerClasses,
        isOpened ? null : closedSidebarClasses
      )}
      ref={containerRef}
    >
      {children}
    </div>
  );
};
