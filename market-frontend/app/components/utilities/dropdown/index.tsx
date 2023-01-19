import clsx from "clsx";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";
import { dropdownContainer } from "./styled";

const Dropdown = ({
  children,
  handleClose,
  isOpened,
  classes,
  exceptedElementRef,
}: {
  children: React.ReactNode;
  handleClose: () => void;
  isOpened: boolean;
  classes?: string;
  exceptedElementRef?: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const { i18n } = useTranslation();
  const containerRef = useRef(null);

  useListenForOutsideClicks({
    handleClose,
    isOpened,
    containerRef,
    exceptedElementRef,
  });

  return (
    <>
      {isOpened ? (
        <div
          className={clsx(
            dropdownContainer,
            classes
              ? classes
              : i18n.dir(i18n.language) === "rtl"
              ? "translate-x-3/4"
              : "-translate-x-3/4"
          )}
          ref={containerRef}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export { Dropdown };
