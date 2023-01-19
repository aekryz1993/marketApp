import type { TDivProps, TMainProps } from "../utility-types";

import clsx from "clsx";
import { mainClasses } from "./styled";

const Box = (props: TDivProps) => {
  const { children, classes, className, ...divProps } = props;

  return (
    <div {...divProps} className={clsx(classes, className)}>
      {children}
    </div>
  );
};

const Container = (props: TDivProps) => <Box {...props}>{props.children}</Box>;

const Main = (props: TMainProps) => {
  const { children, classes, className, ...mainProps } = props;

  return (
    <main {...mainProps} className={clsx(classes, className, mainClasses)}>
      {children}
    </main>
  );
};
export { Container, Box, Main };
