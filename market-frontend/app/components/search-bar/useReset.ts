import { useCallback } from "react";

import { useToggleSidebar } from "~/context/sidebar";

export const useReset = ({
  setIsOpened,
  setEmptySearch,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setEmptySearch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [, setIsSidebarOpen] = useToggleSidebar();

  const handleReset = useCallback(() => {
    setIsOpened(false);
    setIsSidebarOpen(false);
    setEmptySearch(true);
  }, [setEmptySearch, setIsOpened, setIsSidebarOpen]);

  return handleReset;
};
