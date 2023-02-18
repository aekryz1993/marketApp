import type { TImageBody } from "~/context/product-mutation/types";
import type { TImage } from "~/types/endpoints/product";

import { useLayoutEffect, useRef, useState } from "react";
import { useProductSliderContext } from "~/context/product-slider";

export const SelectedImage = ({
  images,
}: {
  images: TImageBody[] | TImage[];
}) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 1,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const {
    productSliderState: { selected },
  } = useProductSliderContext();

  const imageOriginWidth = images[selected].width;
  const imageOriginHeight = images[selected].height;

  const previewImage = images[selected] as TImageBody;
  const imageData = images[selected] as TImage;

  useLayoutEffect(() => {
    const imageHeight = containerRef.current?.getBoundingClientRect().height;

    if (!imageHeight) return;

    const imageWidth = (imageHeight * imageOriginWidth) / imageOriginHeight;

    setImageSize({ width: imageWidth, height: imageHeight });
  }, [imageOriginHeight, imageOriginWidth]);

  return (
    <div
      className="z-10 flex h-full w-full grow items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div>
        <span>
          <img
            alt={images[selected].alt}
            src={imageData.src.original ?? previewImage.src}
            width={imageSize.width}
            height={imageSize.height}
            className="overflow-clip-m-box overflow-clip"
            style={{
              width: `${imageSize.width}px`,
              height: `${imageSize.height}px`,
              aspectRatio: `auto ${imageSize.width} / ${imageSize.height}`,
            }}
          />
        </span>
      </div>
    </div>
  );
};
