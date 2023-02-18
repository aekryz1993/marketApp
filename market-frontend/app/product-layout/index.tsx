import { Box, Container } from "~/components/utilities";
import {
  productContainerClasses,
  productSectionClasses,
} from "./styled";

export const ProductLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Container classes={productSectionClasses}>
      <Container classes="h-full flex flex-col grow min-w-0 z-0">
        <Container
          style={{ maxWidth: "calc(100% - 48px)" }}
          classes={productContainerClasses}
        >
          <Box classes="ml-4 mt-3 w-full overflow-y-hidden">
            <h2 className="font-semibold tracking-wider">Preview</h2>
          </Box>
          <Container classes="flex grow m-4 overflow-hidden basis-0">
            {children}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
