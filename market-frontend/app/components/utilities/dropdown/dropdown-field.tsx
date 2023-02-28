import { PlayIcon } from "@heroicons/react/24/solid";
import { useCallback, useRef, useState } from "react";
import clsx from "clsx";

import { DropdownPortal } from "../portal";

const DropdownField = ({
  children,
  classes,
  selected,
}: {
  children: React.ReactNode;
  classes: string;
  selected: string;
}) => {
  const [dropdownState, setDropdownState] = useState({
    isFocus: false,
    isOpen: false,
  });

  const dropdownFieldRef = useRef<HTMLDivElement>(null);

  const handleDropdownClose = useCallback(() => {
    setDropdownState((prevState) => ({ ...prevState, isOpen: false }));
  }, []);

  return (
    <div
      className={clsx(
        "relative w-full cursor-pointer select-none rounded-lg bg-transparent  py-3.5 pl-2 font-bold",
        dropdownState.isFocus
          ? "border-2 border-text-active_lt outline-0 dark:border-text-active_dark"
          : "border border-gray-300 dark:border-gray-600",
        classes
      )}
      ref={dropdownFieldRef}
      onClick={() => {
        setDropdownState((prevState) => ({
          ...prevState,
          isOpen: !prevState.isOpen,
        }));
      }}
    >
      <PlayIcon className="absolute top-2/4 right-1 h-3 w-4 -translate-y-2/4 rotate-90" />
      <span className="text-gray-500 font-light">{selected}</span>
      {dropdownState.isOpen ? (
        <DropdownPortal
          id="dropdown-input"
          rootClasses={clsx(
            "fixed shadow-3xl z-50 rounded-lg bg-bg-light-sec dark:bg-bg-dark-sec p-0.5 overflow-y-auto"
          )}
          dropdownFieldRef={dropdownFieldRef}
          containerClasses="flex flex-col w-full max-h-[40vh]"
          handleClose={handleDropdownClose}
          isOpened={dropdownState.isOpen}
        >
          {children}
        </DropdownPortal>
      ) : null}
    </div>
  );
};

const DropdownOption = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="cursor-pointer rounded-lg py-2 text-center hover:bg-bg-light-hover dark:hover:bg-bg-dark-hover"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { DropdownField, DropdownOption };
