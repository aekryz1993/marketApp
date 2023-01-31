import { Container } from "../utilities";
import { LocationFilter } from "./location-filter";
import {
  containerClasses,
  filtersContainerClasses,
  headerClasses,
} from "./styled";

export const Filter = () => {
  return (
    <Container classes={containerClasses}>
      <h1 className={headerClasses}>Filters</h1>
      <Container classes={filtersContainerClasses}>
        <LocationFilter />
      </Container>
    </Container>
  );
};
