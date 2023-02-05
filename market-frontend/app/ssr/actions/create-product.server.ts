import type { LoaderArgs } from "@remix-run/node";

import {
  json,
  unstable_composeUploadHandlers,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import { uploadImageToCloudinary } from "~/utils/upload-file-cloudinary.server";

export const createProductAction = async ({
  request,
}: Pick<LoaderArgs, "request">) => {
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, data, filename }) => {
      try {
        if (name !== "images") {
          return undefined;
        }

        const uploadedImage = await uploadImageToCloudinary(data, {
          height: 261,
          width: 261,
          crop: "scale",
        });
        return JSON.stringify({
          alt: filename,
          original: uploadedImage?.secure_url,
          square: uploadedImage?.eager[0].secure_url,
        });
      } catch (error: any) {
        console.error(error.message);
      }
    }
  );
  try {
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
    const images = formData.getAll("images");
    const formattedImages = images.map((image) => JSON.parse(image as string));
    console.log(formattedImages);

    return json({ data: formattedImages });
  } catch (error) {
    console.log(error);
  }
};
