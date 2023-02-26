import ReactDOM from "react-dom";

import { useDropdownPortal } from "./useDropdownPortal";

export const DropdownPortal = ({
  id,
  children,
  rootClasses,
  containerClasses,
  handleClose,
  dropdownFieldRef,
  isOpened,
  isInheritedWidth = false,
}: {
  id: string;
  children: React.ReactNode;
  rootClasses?: string;
  containerClasses?: string;
  handleClose: () => void;
  rootStyle?: { [key: string]: string };
  dropdownFieldRef: React.RefObject<HTMLDivElement>;
  isOpened: boolean;
  isInheritedWidth?: boolean;
}) => {
  const target = useDropdownPortal({
    id,
    rootClasses,
    containerClasses,
    handleClose,
    dropdownFieldRef,
    isOpened,
    isInheritedWidth
  });

  return ReactDOM.createPortal(children, target);
};

export function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}
