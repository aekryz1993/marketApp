import { Box, Container } from "../utilities";
import {
  imagePreviewContainerClasses,
  previewContainerClasses,
  previewSectionClasses,
  productInfoPreviewContainerClasses,
  productInfoPreviewSideClasses,
} from "./styled";

export const PreviewSection = () => {
  return (
    <Container classes={previewSectionClasses}>
      <Container classes="h-full flex flex-col grow min-w-0 z-0">
        <Container
          style={{ maxWidth: "calc(100% - 48px)" }}
          classes={previewContainerClasses}
        >
          <Box classes="ml-4 mt-3 w-full overflow-y-hidden">
            <h2 className="font-semibold tracking-wider">Preview</h2>
          </Box>
          <Container classes="flex grow m-4 overflow-y-hidden basis-0">
            <Container classes={imagePreviewContainerClasses}>
              <></>
            </Container>
            <Container classes={productInfoPreviewSideClasses}>
              <Container classes="flex flex-col shrink-0 w-full min-h-0">
                <Container classes={productInfoPreviewContainerClasses}>
                  
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
