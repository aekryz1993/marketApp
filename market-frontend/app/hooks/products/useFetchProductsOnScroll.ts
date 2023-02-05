import type { TProductsLoaderData } from "~/types/data";
import type { TProduct } from "~/types/endpoints/product";

import { useCallback, useMemo } from "react";
import { useLoaderData, useLocation } from "@remix-run/react";

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

  const location = useLocation();

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

  const variables = useMemo(
    () => ({
      pagination: { skip: currentPage * TAKE, take: TAKE },
      orderBy: { createdAt: OrderBy.desc },
      search: location.search.split("=")[1] ?? undefined,
      filterBy: {
        category: categoryName,
      },
    }),
    [currentPage, location.search, categoryName]
  );

  const handleFetchProducts = useCallback(() => {
    submitting();
    fetchQuery({
      variables,
      fetchPolicy: "no-cache",
      onCompleted: handleCompleted,
    });
  }, [fetchQuery, submitting, handleCompleted, variables]);

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
