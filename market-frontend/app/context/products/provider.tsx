import type { TContext } from "./types";
import type { TProduct } from "~/types/endpoints/product";

import {
  createContext,
  useCallback,
  useReducer,
  useSyncExternalStore,
} from "react";

import { reducer } from "./reducer";
import { initialProducts } from "./helper";
import { compareArrayOfObjects, useDeepMemo } from "~/hooks/useDeepMemo";

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

  const memoProducts: TProduct[] = useDeepMemo(products, compareArrayOfObjects);

  const updateNewProducts = useCallback(() => {
    resetProducts({ products: memoProducts });
    return () => {};
  }, [memoProducts, resetProducts]);

  useSyncExternalStore(
    updateNewProducts,
    () => {},
    () => true
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
