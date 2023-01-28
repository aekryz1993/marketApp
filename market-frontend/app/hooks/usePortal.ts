import { useCallback, useEffect, useRef } from "react";

function createRootElement(id: string, rootClasses?: string) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  rootClasses?.split(" ").forEach((cls) => {
    if (cls) rootContainer.classList.add(cls);
  });
  return rootContainer;
}

function addRootElement(rootElem: Element) {
  if (document.body.lastElementChild)
    document.body.insertBefore(
      rootElem,
      document.body.lastElementChild.nextElementSibling
    );
}

export const usePortal = ({
  id,
  rootClasses,
  containerClasses,
  handleClose,
}: {
  id: string;
  rootClasses?: string;
  containerClasses?: string;
  handleClose?: () => void;
}) => {
  const rootElemRef = useRef<HTMLDivElement | null>(null);
  const parentElemRef = useRef<Element | null>(null);

  const stopPropagationChild = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    parentElemRef.current =
      existingParent || createRootElement(id, rootClasses);
    if (!existingParent) {
      addRootElement(parentElemRef.current);
    }
    parentElemRef.current.appendChild(rootElemRef.current as Element);
  }, [id, rootClasses]);

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
