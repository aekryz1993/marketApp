import type { LoaderArgs } from "@remix-run/node";

import {
  redirect,
  json,
} from "@remix-run/node";

import { createProduct } from "~/endpoints/mutation/product";
import { getAuthSession } from "~/utils/auth.server";

import { getProductForm } from "~/utils/product.server";

export const createProductAction = async ({
  request,
}: Pick<LoaderArgs, "request">) => {
  const authSession = await getAuthSession(request);
  const token = authSession.getToken();

  const { title, description, brand, price, currency, images, tags, locationId, category, condition } = await getProductForm({ request })

  if (!title || !price || !currency || images.length <= 0 || !locationId || !category || !condition) return json({ formError: 'Form is not valid' })

  try {
    const createProductResponse = await createProduct({ title, description, brand, price, currency, images, tags, locationId, category, condition }, token)
    if (createProductResponse.data?.createProduct.statusCode === 201) return redirect('/selling')
  } catch (error: any) {
    console.error(error);
    throw new Response(null, {status: 500, statusText: error.message})
  }
};
