import type { TLiProps } from "../utility-types";

import clsx from "clsx";

import { cardClasses, figureClasses } from "./styled";

const Card = (
  props: TLiProps & { itemwidth: { width: string} }
) => {
  const { children, classes, className, ...divProps } = props;

  return (
    <li
      {...divProps}
      style={props.itemwidth}
      className={clsx(cardClasses, classes, className)}
    >
      <figure className={figureClasses}>{children}</figure>
    </li>
  );
};

export { Card };
