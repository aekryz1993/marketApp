const cardStyle = (breakPoint: string) => {
  switch (breakPoint) {
    case 'xs':
    case 'sm':
      return { width: `${100 / 2}%` };
    case 'md':
    case 'lg':
      return { width: `${100 / 3}%` };
    case 'xl':
      return { width: `${100 / 5}%` };
    case '2xl':
      return { width: `${100 / 6}%` };
    default:
      return { width: `${100 / 6}%` };
  }
};

const cardClasses = "relative flex flex-col cursor-pointer px-2";

const figureClasses = "flex flex-col";

const figureCaptionClasses = "flex flex-col items-start gap text-start pt-3";

export { cardClasses, figureClasses, figureCaptionClasses, cardStyle };
