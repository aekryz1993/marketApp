import { useProductMutationContext } from "~/context/product-mutation";
import { useLayoutEffect, useRef, useState } from "react";
import { useProductSliderContext } from "~/context/product-slider";

export const SelectedImage = () => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 1,
  });

  const {
    productMutationState: { imagesPreview },
  } = useProductMutationContext();

  const containerRef = useRef<HTMLDivElement>(null);

  const imageOriginWidth = imagesPreview[0].width;
  const imageOriginHeight = imagesPreview[0].height;

  const {
    productSliderState: { selected },
  } = useProductSliderContext();

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
            alt={imagesPreview[selected].alt}
            src={imagesPreview[selected].src}
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
