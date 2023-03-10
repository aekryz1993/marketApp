import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useProductSliderContext } from "~/context/product-slider";

export const SliderButtons = ({ imagesNumber }: { imagesNumber: number }) => {
  const { nextImage, previousImage } = useProductSliderContext();

  return (
    <>
      {imagesNumber > 1 && (
        <>
          <div
            className="absolute top-2/4 left-1 z-10 -translate-y-2/4 cursor-pointer"
            onClick={() => previousImage({ numberItems: imagesNumber })}
          >
            <ChevronLeftIcon className="h-8 w-8 rounded-full border bg-white p-1 text-black shadow-3xl border-border-light-pry dark:border-border-dark-pry md:h-12 md:w-12 md:p-2" />
          </div>
          <div
            className="absolute top-2/4 right-1 z-10 -translate-y-2/4 cursor-pointer"
            onClick={() => nextImage({ numberItems: imagesNumber })}
          >
            <ChevronRightIcon className="h-8 w-8 rounded-full border border-border-light-pry dark:border-border-dark-pry bg-white p-1 text-black shadow-3xl md:h-12 md:w-12 md:p-2" />
          </div>
        </>
      )}
    </>
  );
};
