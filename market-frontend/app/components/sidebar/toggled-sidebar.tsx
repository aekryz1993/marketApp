import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useRef } from "react";

import { useToggleSidebar } from "~/context/sidebar";
import {
  closeBtnContainer,
  closeBtnIcon,
  closedSidebarClasses,
  containerClasses,
  toggledContainerClasses,
} from "./styled";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";
import { Box } from "../utilities";
import { Logo } from "../header/logo";

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
      <Box classes={closeBtnContainer} onClick={handleClose}>
        <XMarkIcon className={closeBtnIcon} />
        <Logo />
      </Box>
      {children}
    </div>
  );
};
