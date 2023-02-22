import type { TImageBody } from "~/context/product-mutation/types";
import type { TImage } from "~/types/endpoints/product";

import { useLocation } from "@remix-run/react";
import clsx from "clsx";

import { ProductSliderProvider } from "~/context/product-slider";
import { Container } from "../utilities";
import { Background } from "./background";
import { SelectedImage } from "./selected-image";
import { Slide } from "./slide";
import { SliderButtons } from "./slider-buttons";
import { checkIsViewProductLocation } from "~/utils/helpers";

export const ProductImagesSlider = ({
  images,
}: {
  images: TImageBody[] | TImage[];
}) => {
  const location = useLocation();

  const isViewProductLocation = checkIsViewProductLocation(location.pathname);

  return (
    <ProductSliderProvider>
      <Container classes={clsx("relative w-full h-full flex flex-col bg-black items-center grow select-none overflow-hidden", isViewProductLocation && "shrink-0 md:shrink h-72 md:h-auto")}>
        <Background images={images} />
        <SelectedImage images={images} />
        <Slide images={images} />
        <SliderButtons imagesNumber={images.length} />
      </Container>
    </ProductSliderProvider>
  );
};
