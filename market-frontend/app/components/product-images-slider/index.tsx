import { ProductSliderProvider } from "~/context/product-slider";
import { Container } from "../utilities";
import { Background } from "./background";
import { SelectedImage } from "./selected-image";
import { Slide } from "./slide";
import { SliderButtons } from "./slider-buttons";

export const ProductImagesSlider = () => {
  return (
    <ProductSliderProvider>
      <Container classes="relative w-full h-full flex flex-col bg-black items-center grow select-none overflow-hidden">
        <Background />
        <SelectedImage />
        <Slide />
        <SliderButtons />
      </Container>
    </ProductSliderProvider>
  );
};
