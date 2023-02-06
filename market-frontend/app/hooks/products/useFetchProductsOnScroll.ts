import type { TProductsLoaderData } from "~/types/data";
import type { TProduct } from "~/types/endpoints/product";

import { useCallback, useMemo } from "react";
import { useLoaderData, useSearchParams } from "@remix-run/react";

import { useHandleScroll } from "~/hooks/useHandleScroll";
import { PRODUCTS, TAKE } from "~/endpoints/query/products";
import { useProducts } from "~/context/products";
import { useThrottle } from "./../useThrottle";
import { OrderBy } from "~/types/enums";
import { useFetch } from "./useFetch";

export const useFetchProductsOnScroll = () => {
  const { totalPages, categoryName } = useLoaderData<TProductsLoaderData>();

  const {
    productsState: { currentPage },
    fetchProducts,
    submitting,
  } = useProducts();

  const searchParams = useSearchParams();

  const { fetchQuery, loading } = useFetch<TProduct>({
    name: "products",
    query: PRODUCTS,
  });

  const { handleReachEndScroll } = useHandleScroll();

  const handleCompleted = useCallback(
    (response: {
      [key in string]: {
        [key in string]: TProduct[];
      };
    }) => {
      const data = response.products;
      fetchProducts({
        products: data.products,
        loading: false,
      });
    },
    [fetchProducts]
  );

  const searchParam = searchParams[0].get("search");
  const locationIdParam = searchParams[0].get("locationId");

  const variables = useMemo(
    () => ({
      pagination: { skip: currentPage * TAKE, take: TAKE },
      orderBy: { createdAt: OrderBy.desc },
      search: searchParam ?? undefined,
      filterBy: {
        category: categoryName,
        locationId: locationIdParam ?? undefined,
      },
    }),
    [currentPage, searchParam, categoryName, locationIdParam]
  );

  const handleFetchProducts = useCallback(() => {
    submitting();
    fetchQuery({
      variables,
      fetchPolicy: "no-cache",
      onCompleted: handleCompleted,
    });
  }, [submitting, fetchQuery, variables, handleCompleted]);

  const throttledFetchProducts = useThrottle(
    10,
    {
      trailing: false,
    },
    handleFetchProducts
  );

  const fetchCondition = currentPage < totalPages && !loading;

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLElement, UIEvent>) => {
      const isReached = handleReachEndScroll(event);
      if (isReached && fetchCondition) {
        throttledFetchProducts({});
      }
    },
    [fetchCondition, throttledFetchProducts, handleReachEndScroll]
  );

  return handleScroll;
};
