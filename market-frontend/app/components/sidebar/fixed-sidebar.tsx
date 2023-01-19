import clsx from "clsx";

import { Container } from "../utilities";
import { containerClasses, fixedContainerClasses } from "./styled";

export const FixedSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container classes={clsx(containerClasses, fixedContainerClasses)}>
      {children}
    </Container>
  );
};
