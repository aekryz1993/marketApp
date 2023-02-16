import type { EventTargetExtended } from "~/types/data";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { v4 as uuid } from "uuid";

import { useProductMutationContext } from "~/context/product-mutation";
import clsx from "clsx";
import { Box } from "../utilities";
import { getImageSize } from "~/utils/helpers";

export const AddPhotoUploaderButton = () => {
  const {
    productMutationState: { imagesPreview },
    toggleImages,
  } = useProductMutationContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as EventTargetExtended;
    const files = target.files;
    (async () => {
      const uploadedImages = [];
      for (let file of files) {
        if (!file.type.startsWith("image")) return;
        const src = URL.createObjectURL(file);
        const { width, height } = await getImageSize(file);
        uploadedImages.push({
          id: uuid(),
          src,
          alt: file.name,
          file,
          width,
          height,
        });
      }
      toggleImages({ uploadedImages });
    })();
  };

  return (
    <Box classes={clsx("", imagesPreview.length > 0 && "bg-gray-300 rounded")}>
      <input
        className="z-0 hidden opacity-0"
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        multiple
        required
      />
      <label
        className="flex h-[104px] w-[104px] cursor-pointer flex-col items-center justify-center"
        htmlFor="file-upload"
      >
        <div
          className={clsx(
            "flex items-center justify-center bg-gray-300",
            imagesPreview.length === 0 ? "h-12 w-12 rounded-full" : "h-6 w-6"
          )}
        >
          <PhotoIcon
            className={clsx(
              "origin-center rotate-12",
              imagesPreview.length > 0 ? "h-6 w-6" : "h-6 w-6"
            )}
          />
        </div>
        <span
          className={clsx(
            imagesPreview.length ? "text-sm font-medium" : "text-lg font-black"
          )}
        >
          Add Photos
        </span>
      </label>
    </Box>
  );
};
