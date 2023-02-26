import clsx from "clsx";

import { Container } from "../utilities";
import { cartClasses, textClasses } from "./styled";

export const SellingHeader = () => {
  return (
    <Container classes={clsx(cartClasses, "mt-4")}>
      <h1 className={clsx(textClasses, "select-none text-2xl font-bold tracking-wide antialiased")}>
        Your Listing
      </h1>
    </Container>
  );
};
