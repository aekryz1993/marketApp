import { useCallback, useEffect, useRef } from "react";

import { addRootElement, createRootElement } from "./helper";

export const usePortal = ({
  id,
  rootClasses,
  containerClasses,
  handleClose,
  rootStyle,
}: {
  id: string;
  rootClasses?: string;
  containerClasses?: string;
  handleClose?: () => void;
  rootStyle?: { [key: string]: string };
}) => {
  const rootElemRef = useRef<HTMLDivElement | null>(null);
  const parentElemRef = useRef<Element | null>(null);

  const stopPropagationChild = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    parentElemRef.current =
      existingParent || createRootElement(id, rootClasses, rootStyle);
    if (!existingParent) {
      addRootElement(parentElemRef.current);
    }
    parentElemRef.current.appendChild(rootElemRef.current as Element);
  }, [id, rootClasses, rootStyle]);

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
