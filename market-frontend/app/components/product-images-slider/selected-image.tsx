import { useProductMutationContext } from "~/context/product-mutation";
import { Container } from "../utilities";
import { useLayoutEffect, useRef, useState } from "react";

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

  useLayoutEffect(() => {
    const imageHeight = containerRef.current?.getBoundingClientRect().height;

    if (!imageHeight) return;

    const imageWidth = (imageHeight * imageOriginWidth) / imageOriginHeight;

    setImageSize({ width: imageWidth, height: imageHeight });
  }, [imageOriginHeight, imageOriginWidth]);

  return (
    <div
      className="flex h-full w-full grow items-center justify-center overflow-hidden z-10"
      ref={containerRef}
    >
      <div>
        <span>
          <img
            alt={imagesPreview[0].alt}
            src={imagesPreview[0].src}
            width={imageSize.width}
            height={imageSize.height}
            className="overflow-clip-m-box aspect-[3/4] overflow-clip"
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
