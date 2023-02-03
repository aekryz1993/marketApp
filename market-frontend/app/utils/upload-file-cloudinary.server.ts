import type { UploadApiResponse } from "cloudinary";

import cloudinary from "cloudinary";
import { writeAsyncIterableToWritable } from "@remix-run/node";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImageToCloudinary(
  data: AsyncIterable<Uint8Array>,
  transformation?: { height: number; width: number; crop: string }
) {
  try {
    const uploadSquarePromise = new Promise<UploadApiResponse>(
      async (resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "market",
            eager: [transformation],

          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            if (result) resolve(result);
          }
        );
        await writeAsyncIterableToWritable(data, uploadStream);
      }
    );
    return uploadSquarePromise;
  } catch (error) {
    console.error(error);
  }
}

export { uploadImageToCloudinary };
