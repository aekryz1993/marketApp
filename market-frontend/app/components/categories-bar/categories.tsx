import { Link } from "@remix-run/react";
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
import { useProducts } from "~/context/products";
import { useCallback } from "react";

export const Categories = () => {
  const [, setIsOpen] = useToggleSidebar();
  const { resetProducts } = useProducts();

  const handleReset = useCallback(() => {
    resetProducts({ loading: true });
    setIsOpen(false);
  }, [resetProducts, setIsOpen]);

  return (
    <Container classes={categoriesContainerClasses}>
      {categories.map((category) => (
        <Link
          key={category.name}
          to={`/${category.pathname}`}
          onClick={handleReset}
        >
          <Box classes={clsx(dropdownSlot, categoryBoxClasses)}>
            <span className={categoryNameClasses}>{category.label}</span>
          </Box>
        </Link>
      ))}
    </Container>
  );
};
