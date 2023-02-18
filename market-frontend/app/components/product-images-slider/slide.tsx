import type { TImageBody } from "~/context/product-mutation/types";
import type { TImage } from "~/types/endpoints/product";

import { Container } from "../utilities";
import { useProductSliderContext } from "~/context/product-slider";
import clsx from "clsx";

export const Slide = ({ images }: { images: TImageBody[] | TImage[] }) => {
  const {
    productSliderState: { selected },
    selectImage,
  } = useProductSliderContext();

  return (
    <>
      {images.length > 1 && (
        <Container classes="max-w-[calc(100% + 140px)] z-10">
          <div className="py-2">
            <Container classes="h-9 max-w-full flex items-center">
              {images.map((image, index) => {
                const previewImage = image as TImageBody;
                const imageData = image as TImage;
                return (
                  <Container
                    key={image.id}
                    classes={clsx(
                      "mx-1.5 h-9 w-9 shrink overflow-hidden rounded-lg hover:opacity-100 cursor-pointer",
                      selected === index ? "opacity-100" : "opacity-40"
                    )}
                    onClick={() => {
                      selectImage({ index });
                    }}
                  >
                    <img
                      alt={image.alt}
                      src={imageData.src.original ?? previewImage.src}
                      className="overflow-clip-m-box h-full w-full overflow-clip object-cover"
                    />
                  </Container>
                );
              })}
            </Container>
          </div>
        </Container>
      )}
    </>
  );
};
