import type { TContext } from "./types";
import type { TProduct } from "~/types/endpoints/product";

import {
  createContext,
  useCallback,
  useReducer,
} from "react";

import { reducer } from "./reducer";
import { initialProducts } from "./helper";

export const ProductsContext = createContext<TContext | undefined>(undefined);

export const ProductsProvider = ({
  children,
  products = [],
}: {
  children: React.ReactNode;
  products: TProduct[];
}) => {
  const [state, dispatch] = useReducer(reducer, initialProducts(products));


  const fetchProducts = useCallback(
    ({ products }: { products: TProduct[] }) => {
      dispatch({ type: "FETCH_PRODUCTS", payload: { products } });
    },
    []
  );

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
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
