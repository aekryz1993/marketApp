import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useProductMutationContext } from "~/context/product-mutation";
import { useProductSliderContext } from "~/context/product-slider";

export const SliderButtons = () => {
  const {
    productMutationState: { imagesPreview },
  } = useProductMutationContext();

  const { nextImage, previousImage } = useProductSliderContext();

  return (
    <>
      {imagesPreview.length > 1 && (
        <>
          <div
            className="absolute top-2/4 left-1 z-10 -translate-y-2/4 cursor-pointer"
            onClick={() => previousImage({ numberItems: imagesPreview.length })}
          >
            <ChevronLeftIcon className="h-12 w-12 rounded-full border border-neutral-400 bg-white p-2 text-black shadow-3xl" />
          </div>
          <div
            className="absolute top-2/4 right-1 z-10 -translate-y-2/4 cursor-pointer"
            onClick={() => nextImage({ numberItems: imagesPreview.length })}
          >
            <ChevronRightIcon className="h-12 w-12 rounded-full border border-neutral-400 bg-white p-2 text-black shadow-3xl" />
          </div>
        </>
      )}
    </>
  );
};
