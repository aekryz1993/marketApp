import { useCallback, useEffect, useRef } from "react";

const style = (
  node: HTMLDivElement,
  styles: {
    [key: string]: string;
  }
) => {
  Object.keys(styles).forEach(
    (key) => (node.style[key as any] = styles[key])
  );
};

function createRootElement(id: string, rootClasses?: string, rootStyle?: { [key: string]: string }) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  if (rootStyle) {
    style(rootContainer, rootStyle);
  }
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
