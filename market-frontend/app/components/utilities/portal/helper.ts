const style = (
  node: HTMLDivElement,
  styles: {
    [key: string]: string;
  }
) => {
  Object.keys(styles).forEach((key) => (node.style[key as any] = styles[key]));
};

const isInverse = (
  containerHeight: number,
  dropdownFieldBottom: number,
  parentHeight: number | undefined
) => {
  if (typeof parentHeight === "undefined") return false;
  return containerHeight - (parentHeight + dropdownFieldBottom) <= 0;
};

const getTransform = (
  containerHeight: number,
  dropdownFieldBottom: number,
  parentHeight: number | undefined,
  translateX?: string
) =>
  isInverse(containerHeight, dropdownFieldBottom, parentHeight)
    ? `translate(${translateX ?? 0}, calc(-100% - 54px))`
    : `translate(${translateX ?? 0}, 0)`;
    
const isHidden = (
  containerBottom: number,
  dropdownFieldTop: number,
  containerTop: number,
  dropdownFieldBottom: number
) =>
  containerBottom - dropdownFieldTop <= 0 ||
  containerTop - dropdownFieldBottom >= 0;

function createRootElement(
  id: string,
  rootClasses?: string,
  rootStyle?: { [key: string]: string }
) {
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

export {
  createRootElement,
  addRootElement,
  style,
  isInverse,
  getTransform,
  isHidden,
};
