import type { TPayload, TState } from "./types";
import type { TProduct } from "~/types/endpoints/product";

const initialProducts = (products: TProduct[]) => {
  return {
    products,
    currentPage: 1,
    loading: false,
  };
};

const fetchProducts = ({
  state,
  payload,
}: {
  state: TState;
  payload: Required<TPayload>;
}) => ({
  ...state,
  products:
    state.products?.length > 0
      ? [...state.products, ...payload.products]
      : payload.products,
  currentPage: state.currentPage + 1,
  loading: false,
});

const resetProducts = ({
  state,
  payload,
}: {
  state: TState;
  payload?: TPayload;
}) => ({
  ...state,
  products: payload?.products ?? [],
  currentPage: payload?.currentPage ?? 1,
  loading: payload?.loading ?? false,
});

export { initialProducts, fetchProducts, resetProducts };
