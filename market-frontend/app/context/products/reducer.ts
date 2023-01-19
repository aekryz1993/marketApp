import type { TAction, TPayload, TState } from "./types";

import { fetchProducts, resetProducts } from "./helper";

export const reducer = (state: TState, action: TAction) => {
  const actions = {
    FETCH_PRODUCTS: () =>
      fetchProducts({ state, payload: action.payload as Required<TPayload> }),
    RESET_PRODUCTS: () =>
      resetProducts({ state, payload: action.payload }),
    DEFAULT: () => {
      throw new Error("Unknown action");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};
