import type { TLiProps } from "../utility-types";

import clsx from "clsx";

import { cardClasses, cardWidth, figureClasses } from "./styled";

const Card = (props: TLiProps) => {
  const { children, classes, className, ...divProps } = props;

  return (
    <li
      {...divProps}
      className={clsx(cardClasses, cardWidth, classes, className)}
    >
      <figure className={figureClasses}>{children}</figure>
    </li>
  );
};

export { Card };
