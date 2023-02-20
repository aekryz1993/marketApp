import { useLocation } from "@remix-run/react";
import clsx from "clsx";

import { Container } from "~/components/utilities";
import { productInfoSideClasses, productInfoContainerClasses } from "./styled";
import { checkIsViewProductLocation } from "~/utils/helpers";

export const ProductItemsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();

  const isViewProductLocation = checkIsViewProductLocation(location.pathname);

  return (
    <Container
      classes={clsx(
        productInfoSideClasses,
        isViewProductLocation
          ? "md:basis-[360px] md:shrink-0 h-4/6 md:h-auto"
          : "basis-[360px]"
      )}
    >
      <Container classes="flex flex-col md:shrink-0 w-full min-h-0">
        <Container classes={productInfoContainerClasses}>
          {children}
        </Container>
      </Container>
    </Container>
  );
};
