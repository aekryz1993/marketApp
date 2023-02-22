import clsx from "clsx";
import { useLocation } from "@remix-run/react";

import { Box, Container } from "~/components/utilities";
import { productContainerClasses, productSectionClasses } from "./styled";
import { checkIsViewProductLocation } from "~/utils/helpers";

export const ProductLayout = ({
  children,
  layoutType,
}: {
  children: React.ReactNode;
  layoutType?: string;
}) => {
  const location = useLocation();

  const isViewProductLocation = checkIsViewProductLocation(location.pathname);

  return (
    <Container classes={clsx(productSectionClasses)}>
      <Container classes="h-full flex flex-col grow min-w-0 z-0">
        <Container
          classes={clsx(
            productContainerClasses,
            !isViewProductLocation
              ? "w-[972px] mx-6 mt-14 mb-8"
              : "md:my-4 w-full"
          )}
        >
          {!isViewProductLocation ? (
            <Box classes="ml-4 mt-3 w-full overflow-y-hidden">
              <h2 className="font-semibold tracking-wider">{layoutType}</h2>
            </Box>
          ) : null}
          <Container
            classes={clsx(
              "flex flex-col md:flex-row md:grow overflow-hidden basis-0",
              isViewProductLocation ? "" : "md:m-4 shrink-0"
            )}
          >
            {children}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
