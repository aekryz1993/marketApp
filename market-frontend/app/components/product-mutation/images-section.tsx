import { useProductMutationContext } from "~/context/product-mutation";
import { Box, Container } from "../utilities";
import { setPhotosBoxClasses } from "./styled";
import { AddPhotoUploaderButton } from "./add-photo-uploader-button";
import { UploadedPhotos } from "./uploaded-photos";
import clsx from "clsx";

export const ImagesSection = () => {
  const {
    productMutationState: { imagesPreview },
  } = useProductMutationContext();

  return (
    <Container classes="w-full py-4">
      <p className="py-2">
        <span
          className={clsx(
            "font-black",
            imagesPreview.length > 10 &&
              "text-alert-danger_lt dark:text-alert-danger_dark"
          )}
        >{`Photos · ${imagesPreview.length} / 10 - `}</span>
        You can add up to 10 photos.
      </p>
      <Box className={setPhotosBoxClasses(imagesPreview.length === 0)}>
        <UploadedPhotos />
        {imagesPreview.length < 10 && <AddPhotoUploaderButton />}
      </Box>
      {imagesPreview.length > 10 && (
        <div className="py-2">
          <span className="text-sm text-alert-danger_lt dark:text-alert-danger_dark">
            You may only select a maximum of 10 photos.
          </span>
        </div>
      )}
    </Container>
  );
};
