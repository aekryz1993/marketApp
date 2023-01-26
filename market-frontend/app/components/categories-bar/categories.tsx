import { NavLink } from "@remix-run/react";
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
import { useCallback } from "react";

export const Categories = () => {
  const [, setIsOpen] = useToggleSidebar();

  const handleReset = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Container classes={categoriesContainerClasses}>
      {categories.map((category) => (
        <NavLink
          key={category.name}
          to={`/${category.pathname}`}
          onClick={handleReset}
          prefetch="intent"
          preventScrollReset
        >
          <Box classes={clsx(dropdownSlot, categoryBoxClasses)}>
            <span className={categoryNameClasses}>{category.label}</span>
          </Box>
        </NavLink>
      ))}
    </Container>
  );
};
