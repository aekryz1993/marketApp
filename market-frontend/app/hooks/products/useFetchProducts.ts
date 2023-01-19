import type { OperationVariables } from "@apollo/client";
import type { TProductsLoaderData } from "~/types/data";
import type { TProduct } from "~/types/endpoints/product";

import { useLazyQuery } from "@apollo/client";
import { useLoaderData } from "@remix-run/react";

import { PRODUCTS } from "~/endpoints/query/products";

export const useFetchProducts = () => {
  const { token } = useLoaderData<TProductsLoaderData>();

  const [fetchProductsQuery, { loading, called }] = useLazyQuery<
    { products: { products: TProduct } },
    OperationVariables
  >(PRODUCTS, {
    context: {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  });

  return { fetchProductsQuery, loading, called };
};
