import type { LoaderFunction } from "@remix-run/node";
import type { TProductsInput } from "~/types/endpoints/product";
import type { Category, OrderBy } from "~/types/enums";

import { json } from "@remix-run/node";

import { fetchProducts } from "~/endpoints/query/products";

export const loader: LoaderFunction = async ({ request }) => {
  let { searchParams } = new URL(request.url);
  const skip = searchParams.get("skip");
  const search = searchParams.get("search");
  const createdAt = searchParams.get("createdAt") as OrderBy;
  const category = searchParams.get("category") as Category; 

  const inputVariables: TProductsInput = skip
    ? { pagination: { skip: parseInt(skip), take: 5 } }
    : { pagination: { skip: 0, take: 5 } };

  if (search) inputVariables.search = search
  if (category) inputVariables.filterBy = {category}
  if (createdAt) inputVariables.orderBy = {createdAt}

  const response = await fetchProducts(inputVariables)
  if (response.data) return json({ products: response.data.products });

  throw new Error("Failed to retrieve locations");
};
