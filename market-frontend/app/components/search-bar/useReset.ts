import { useCallback } from "react";

import { useProducts } from "~/context/products";
import { useToggleSidebar } from "~/context/sidebar";

export const useReset = ({
  setIsOpened,
}: {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [, setIsSidebarOpen] = useToggleSidebar();
  const { resetProducts } = useProducts();

  const handleReset = useCallback(() => {
    setIsSidebarOpen(false);
    setIsOpened(false);
    resetProducts({ currentPage: 0, loading: true });
  }, [resetProducts, setIsOpened, setIsSidebarOpen]);

  return handleReset;
};
