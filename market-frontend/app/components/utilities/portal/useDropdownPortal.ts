import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  addRootElement,
  createRootElement,
  getTransform,
  isHidden,
  isInverse,
} from "./helper";
import { useListenForOutsideClicks } from "~/hooks/useListenForOutsideClicks";
import { useContainerElementContext } from "~/context/container-element-context";

export const useDropdownPortal = ({
  id,
  rootClasses,
  containerClasses,
  handleClose,
  dropdownFieldRef,
  isOpened,
}: {
  id: string;
  rootClasses?: string;
  containerClasses?: string;
  handleClose: () => void;
  dropdownFieldRef: React.RefObject<HTMLDivElement>;
  isOpened: boolean;
}) => {
  const rootElemRef = useRef<HTMLDivElement | null>(null);
  const parentElemRef = useRef<Element | null>(null);

  const containerRef = useContainerElementContext()

  const [position, setPosition] = useState(() => {
    if (!containerRef.current || !dropdownFieldRef.current)
      return {
        top: "",
        left: "",
        width: "",
        transform: "",
        hidden: false,
      };
    const boundingClientRect = dropdownFieldRef.current.getBoundingClientRect();

    return {
      top: `${boundingClientRect?.bottom ? boundingClientRect?.bottom : 0}px`,
      left: `${boundingClientRect?.left ? boundingClientRect?.left : 0}px`,
      width: `${dropdownFieldRef.current?.clientWidth}px`,
      transform: "",
      hidden: false,
    };
  });

  useListenForOutsideClicks({
    isOpened,
    handleClose,
    containerRef: parentElemRef,
  });

  const style = useMemo(
    () => ({
      top: position.top,
      left: position.left,
      transform: position.transform,
      width: position.width,
      hidden: position.hidden,
    }),
    [
      position.hidden,
      position.left,
      position.top,
      position.transform,
      position.width,
    ]
  );

  const handleChangePosition = useCallback(() => {
    if (!containerRef.current || !dropdownFieldRef.current) return;

    const boundingClientRect =
      dropdownFieldRef.current?.getBoundingClientRect();

    const containerBoundingClientRect =
      containerRef.current?.getBoundingClientRect();

    const parentElemBoundingClientRect =
      parentElemRef.current?.getBoundingClientRect();

    const style: {
      top: string;
      left: string;
      width: string;
      transform: string;
      hidden: boolean;
    } = {
      top: `${boundingClientRect?.bottom ? boundingClientRect?.bottom : 0}px`,
      left: `${boundingClientRect?.left ? boundingClientRect?.left : 0}px`,
      width: `${dropdownFieldRef.current?.clientWidth}px`,
      transform: isInverse(
        containerRef.current?.clientHeight + containerBoundingClientRect.top,
        boundingClientRect?.bottom,
        parentElemBoundingClientRect?.height
      )
        ? "translate(0, calc(-100% - 54px))"
        : "",
      hidden: isHidden(
        containerBoundingClientRect.bottom,
        boundingClientRect.top,
        containerBoundingClientRect.top,
        boundingClientRect.bottom
      )
        ? true
        : false,
    };

    setPosition((prevState) => ({ ...prevState, ...style }));
  }, [containerRef, dropdownFieldRef]);

  const stopPropagationChild = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener("scroll", handleChangePosition);
    return () => container?.removeEventListener("scroll", handleChangePosition);
  }, [containerRef, handleChangePosition]);

  useLayoutEffect(() => {
    if (!containerRef.current || !dropdownFieldRef.current) return;

    const boundingClientRect =
      dropdownFieldRef.current?.getBoundingClientRect();

    const existingParent = document.querySelector(`#${id}`);

    parentElemRef.current =
      existingParent || createRootElement(id, rootClasses);
    if (!existingParent) {
      addRootElement(parentElemRef.current);
    }
    parentElemRef.current.appendChild(rootElemRef.current as Element);

    const transform = getTransform(
      containerRef.current.clientHeight +
        containerRef.current.getBoundingClientRect().top,
      boundingClientRect.bottom,
      parentElemRef.current.getBoundingClientRect()?.height
    );

    parentElemRef.current.setAttribute(
      "style",
      `top: ${style.top}; left: ${style.left}; width: ${
        style.width
      }; transform: ${transform}; display: ${style.hidden ? "none" : "block"}`
    );
  }, [dropdownFieldRef, id, style, rootClasses, containerRef]);

  useEffect(() => {
    if (handleClose) {
      parentElemRef.current?.addEventListener("click", handleClose);
      rootElemRef.current?.addEventListener("click", stopPropagationChild);
    }
    return () => {
      rootElemRef.current?.remove();
      if (!parentElemRef.current?.childElementCount) {
        parentElemRef.current?.remove();
        if (handleClose) {
          parentElemRef.current?.removeEventListener("click", handleClose);
          rootElemRef.current?.removeEventListener(
            "click",
            stopPropagationChild
          );
        }
      }
    };
  }, [handleClose, stopPropagationChild]);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
      containerClasses?.split(" ").forEach((cls) => {
        rootElemRef.current?.classList.add(cls);
      });
    }
    return rootElemRef.current;
  }

  return getRootElem();
};
