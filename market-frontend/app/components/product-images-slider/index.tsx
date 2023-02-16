import { Container } from "../utilities";
import { Background } from "./background";
import { SelectedImage } from "./selected-image";
import { Slide } from "./slide";

export const ProductImagesSlider = () => {
  return (
    <Container classes="relative w-full h-full flex flex-col">
      <Background />
      <SelectedImage />
      <Slide />
    </Container>
  );
};
