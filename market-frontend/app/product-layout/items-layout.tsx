
import { Container } from "~/components/utilities";
import {
  productInfoSideClasses,
  productInfoContainerClasses,
} from "./styled";

export const ProductItemsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Container classes={productInfoSideClasses}>
      <Container classes="flex flex-col shrink-0 w-full min-h-0">
        <Container classes={productInfoContainerClasses}>
          {children}
        </Container>
      </Container>
    </Container>
  );
};
