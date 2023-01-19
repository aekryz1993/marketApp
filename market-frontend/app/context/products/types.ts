import type { TProduct } from "~/types/endpoints/product";
import type { TDispatch } from "~/types/helper";

export interface TState {
  products: TProduct[];
  currentPage: number;
  loading: boolean;
}

export interface TPayload {
  products?: TProduct[];
  currentPage?: number;
  loading?: boolean;
}

export type TActionType = "FETCH_PRODUCTS" | "RESET_PRODUCTS";

export interface TAction {
  type: TActionType;
  payload?: TPayload;
}

export interface TContext {
  productsState: TState;
  fetchProducts: TDispatch;
  resetProducts: TDispatch;
}
