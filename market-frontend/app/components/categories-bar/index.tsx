import { Container } from "../utilities"
import { Categories } from "./categories"
import { categoriesBarContainerClasses, headerClasses } from "./styled"

export const CategoriesBar = () => {
  return <Container classes={categoriesBarContainerClasses}>
    <h1 className={headerClasses}>Categories</h1>
    <Categories />
  </Container>
}