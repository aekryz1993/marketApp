import { SearchBar } from "../search-bar";
import { Container } from "../utilities";
import { CreateListing } from "./create-listing";
import { topSectionClasses } from "./styled";
import { ToggledSidebar } from "./toggled-sidebar";
import { CategoriesBar } from "../categories-bar";
import { Filter } from "../filter-products";

export const Sidebar = () => {
  return (
    <ToggledSidebar>
      <Container classes={topSectionClasses}>
        <SearchBar />
        <CreateListing />
      </Container>
      <Filter />
      <CategoriesBar />
    </ToggledSidebar>
  );
};
