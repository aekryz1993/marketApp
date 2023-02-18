import type { LoaderArgs } from "@remix-run/node";
import type { Category, Condition, Currency } from "~/types/enums";
import type { TImagePhoto } from "~/types/endpoints/product";

import { unstable_composeUploadHandlers, unstable_parseMultipartFormData } from "@remix-run/node";
import { uploadImageToCloudinary } from "./upload-file-cloudinary.server";

const uploadImagesHandler = () => unstable_composeUploadHandlers(
  async ({ name, data, filename }) => {
    try {
      if (name !== "images") {
        const formData = data as AsyncIterable<Uint8Array> & { next: () => Promise<{ value: BufferSource }> }
        const { value } = await formData.next()
        const decodedValue = new TextDecoder().decode(value);
        return decodedValue;
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
        width: uploadedImage?.width,
        height: uploadedImage?.height
      });
    } catch (error: any) {
      console.error(error.message);
    }
  }
);

const getProductForm = async ({ request }: Pick<LoaderArgs, "request">) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadImagesHandler()
  );
  const images = formData.getAll("images") as string[];
  const tags = formData.getAll("tags") as string[] | null;
  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const brand = formData.get('brand') as string | null
  const locationId = formData.get('locationId') as string
  const category = formData.get('category') as Category
  const condition = formData.get('condition') as Condition
  const currency = formData.get('currency') as Currency
  const price = formData.get('currentPrice') as string

  const formattedImages = images.map((image) => JSON.parse(image as string)) as TImagePhoto[]
  const formattedPrice = parseFloat(price.replace(/,/g, ''))

  return { title, description, brand, price: formattedPrice, currency, images: formattedImages, tags, locationId, category, condition }
}

export { uploadImagesHandler, getProductForm }
