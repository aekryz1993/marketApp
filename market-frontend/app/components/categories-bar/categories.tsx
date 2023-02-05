import type { RemixNavLinkProps } from "@remix-run/react/dist/components";

import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

import { Box, Container } from "../utilities";
import { categories } from "~/utils/helpers";
import { dropdownSlot } from "../utilities/dropdown/styled";
import {
  categoriesContainerClasses,
  categoryBoxClasses,
  categoryNameClasses,
} from "./styled";
import { useToggleSidebar } from "~/context/sidebar";
import React, { useCallback } from "react";

export const Categories = () => {
  const [, setIsOpen] = useToggleSidebar();

  const handleReset = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Container classes={categoriesContainerClasses}>
      {categories.map((category) => (
        <ConditionalNavLink
          key={category.name}
          to={`/${category.pathname}`}
          onClick={handleReset}
          prefetch="intent"
          preventScrollReset
        >
          <Box classes={clsx(dropdownSlot, categoryBoxClasses)}>
            <span className={categoryNameClasses}>{category.label}</span>
          </Box>
        </ConditionalNavLink>
      ))}
    </Container>
  );
};

const ConditionalNavLink = (
  props: Pick<
    RemixNavLinkProps,
    "to" | "onClick" | "prefetch" | "preventScrollReset"
  > & { children: React.ReactNode }
) => {
  const { children, ...linkProps } = props;
  const location = useLocation();

  const disableNavigation =
    location.pathname === props.to && location.search.length === 0;

  return (
    <>
      {!disableNavigation ? (
        <Link {...linkProps}>{children}</Link>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
