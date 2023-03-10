import clsx from "clsx";

import { ProductImagesSlider } from "~/components/product-images-slider";
import { imagePreviewContainerClasses } from "~/components/product-images-slider/styled";
import { Box, Container } from "~/components/utilities";
import { useProductMutationContext } from "~/context/product-mutation";

export const PreviewImages = () => {
  const {
    productMutationState: { imagesPreview },
  } = useProductMutationContext();

  return (
    <>
      {imagesPreview.length === 0 ? (
        <Container
          classes={clsx(
            imagePreviewContainerClasses,
            "bg-bg-input_lt dark:bg-bg-input_dark"
          )}
        >
          <Container classes="flex justify-center items-center w-full h-full">
            <Container classes="max-w-[400px] flex flex-col text-center text-neutral-600 dark:text-neutral-50 tracking-wider">
              <Box classes="my-1 text-2xl">
                <span className="font-semibold">Your Listing Preview</span>
              </Box>
              <Box classes="my-1 text-xl">
                <span>
                  As you create your listing, you can preview how it will appear
                  to others on Marketplace.
                </span>
              </Box>
            </Container>
          </Container>
        </Container>
      ) : (
        <Container classes={clsx(imagePreviewContainerClasses, "bg-black")}>
          <ProductImagesSlider images={imagesPreview} />
        </Container>
      )}
    </>
  );
};
