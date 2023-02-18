import type { TImageBody } from "~/context/product-mutation/types";
import type { TImage } from "~/types/endpoints/product";

import { Container } from "../utilities";
import { useProductSliderContext } from "~/context/product-slider";

export const Background = ({images}: {images: TImageBody[] | TImage[]}) => {

  const { productSliderState: {selected}} = useProductSliderContext();

  const previewImage = images[selected] as TImageBody;
  const imageData = images[selected] as TImage;

  return (
    <Container classes="absolute top-0 bottom-0 left-0 right-0 opacity-70 z-0">
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <div className="h-[10%] w-[10%] scale-[11]">
          <span className="blur-[2px]">
            <img
              alt={images[selected].alt}
              src={imageData.src.original ?? previewImage.src}
              className="overflow-clip-m-box h-full w-full overflow-clip object-cover"
            />
          </span>
        </div>
      </div>
    </Container>
  );
};
