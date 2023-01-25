import type { TProductsLoaderData } from "~/types/data";
import type { TProduct } from "~/types/endpoints/product";

import { useCallback, useMemo } from "react";
import { useLoaderData, useLocation } from "@remix-run/react";

import { useHandleScroll } from "~/hooks/useHandleScroll";
import { TAKE } from "~/endpoints/query/products";
import { useProducts } from "~/context/products";
import { useFetchProducts } from "./useFetchProducts";
import { useThrottle } from "./../useThrottle";
import { OrderBy } from "~/types/enums";

export const useFetchProductsOnScroll = () => {
  const { totalPages, categoryName } = useLoaderData<TProductsLoaderData>();
  const {
    productsState: { currentPage },
    fetchProducts,
  } = useProducts();

  const location = useLocation();

  const { fetchProductsQuery, loading } = useFetchProducts();

  const { handleReachEndScroll } = useHandleScroll();

  const handleCompleted = useCallback(
    (response: {
      products: {
        products: TProduct;
      };
    }) => {
      const data = response.products;
      fetchProducts({
        products: data.products,
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
    fetchProductsQuery({
      variables,
      fetchPolicy: "no-cache",
      onCompleted: handleCompleted,
    });
  }, [fetchProductsQuery, handleCompleted, variables]);

  const throttledFetchProducts = useThrottle(handleFetchProducts, 10, {
    trailing: false,
  });

  const fetchCondition = currentPage < totalPages && !loading;

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLElement, UIEvent>) => {
      const isReached = handleReachEndScroll(event);
      if (isReached && fetchCondition) {
        throttledFetchProducts();
      }
    },
    [fetchCondition, throttledFetchProducts, handleReachEndScroll]
  );

  return handleScroll;
};
