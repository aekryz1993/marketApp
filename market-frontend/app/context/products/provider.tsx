import type { TContext } from "./types";
import type { TProduct } from "~/types/endpoints/product";
import type { TProductsLoaderData } from "~/types/data";

import { createContext, useCallback, useReducer } from "react";
import { useLoaderData } from "@remix-run/react";

import { reducer } from "./reducer";
import { initialProducts } from "./helper";

export const ProductsContext = createContext<TContext | undefined>(undefined);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = useLoaderData<TProductsLoaderData>();

  const [state, dispatch] = useReducer(reducer, initialProducts(data.products));

  const fetchProducts = useCallback(
    ({ products }: { products: TProduct[] }) => {
      dispatch({ type: "FETCH_PRODUCTS", payload: { products } });
    },
    []
  );

  const submitting = useCallback(() => {
    dispatch({ type: "SUBMITTING" });
  }, [])

  const resetProducts = useCallback(
    ({
      products,
      currentPage,
      loading,
    }: {
      products?: TProduct[];
      currentPage?: number;
      loading?: boolean;
    }) => {
      dispatch({
        type: "RESET_PRODUCTS",
        payload: { currentPage, products, loading },
      });
    },
    []
  );

  const value = {
    productsState: { ...state },
    fetchProducts,
    resetProducts,
    submitting,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
