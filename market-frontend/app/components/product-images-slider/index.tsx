import type { TImageBody } from "~/context/product-mutation/types";
import type { TImage } from "~/types/endpoints/product";

import { ProductSliderProvider } from "~/context/product-slider";
import { Container } from "../utilities";
import { Background } from "./background";
import { SelectedImage } from "./selected-image";
import { Slide } from "./slide";
import { SliderButtons } from "./slider-buttons";

export const ProductImagesSlider = ({
  images,
}: {
  images: TImageBody[] | TImage[];
}) => {
  return (
    <ProductSliderProvider>
      <Container classes="relative w-full h-full flex flex-col bg-black items-center grow select-none overflow-hidden">
        <Background images={images} />
        <SelectedImage images={images} />
        <Slide images={images} />
        <SliderButtons imagesNumber={images.length} />
      </Container>
    </ProductSliderProvider>
  );
};
