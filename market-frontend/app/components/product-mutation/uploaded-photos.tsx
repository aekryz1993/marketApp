import { XMarkIcon } from "@heroicons/react/24/solid";

import { useProductMutationContext } from "~/context/product-mutation";

export const UploadedPhotos = () => {
  const {
    productMutationState: { imagesPreview },
    deleteImage,
  } = useProductMutationContext();

  return (
    <>
      {imagesPreview.length > 0 &&
        imagesPreview.map((image) => (
          <div key={image.id} className="relative">
            <img
              className="h-[104px] w-[104px]"
              alt={image.alt}
              src={image.src}
            />
            <XMarkIcon
              className="absolute top-2 right-2 h-6 w-6 cursor-pointer rounded-full bg-zinc-500 p-1 text-slate-50 focus:bg-slate-900"
              onClick={() => {
                deleteImage({ id: image.id });
              }}
            />
          </div>
        ))}
    </>
  );
};
