import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { fetchProduct } from "~/endpoints/query/products";

export const productLoader = async ({
  params,
}: Pick<LoaderArgs, "params">) => {
  const productId = params?.productId
  if (!productId) return json({ formError: 'product id must be provided' })
  try {
    const productResponse = await fetchProduct(productId)
    if (productResponse?.data?.product.statusCode === 200) {
      return json({ product: productResponse.data.product.product })
    }
  } catch (error: any) {
    console.error(error)
    throw new Response(null, { status: 500, statusText: error.message });
  }
};
