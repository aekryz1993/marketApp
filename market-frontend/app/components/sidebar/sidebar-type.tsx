import type { SidebarTypes } from "~/context/sidebar";

import { memo } from "react";
import { SearchBar } from "../search-bar";
import { Container } from "../utilities";
import { CreateListing } from "./create-listing";
import { FixedSidebar } from "./fixed-sidebar";
import { topSectionClasses } from "./styled";
import { ToggledSidebar } from "./toggled-sidebar";
import { CategoriesBar } from "../categories-bar";
import { Filter } from "../filter-products";

const componentMap = {
  FIX: FixedSidebar,
  TOGGLE: ToggledSidebar,
};

export const SidebarType = memo(({ type }: { type: SidebarTypes }) => {
  const Component = componentMap[type];

  return (
    <Component>
      <Container classes={topSectionClasses}>
        <SearchBar />
        <CreateListing />
      </Container>
      <Filter />
      <CategoriesBar />
    </Component>
  );
});

SidebarType.displayName = "SidebarType";
