import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { fetchProduct } from "~/endpoints/query/products";

export const productLoader = async ({
  params,
}: Pick<LoaderArgs, "params">) => {
  try {
    const productId = params?.productId
    if (!productId) return json({ error: 'product id must be provided' })

    const productResponse = await fetchProduct(productId)
    if (productResponse?.data?.product.statusCode === 200) {
      return json({ product: productResponse?.data?.product.product })
    }
  } catch (error: any) {
    return json({ error: error.message });
  }
};
