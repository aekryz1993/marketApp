import { reducer } from "./reducer";
import type { TContext, TPayload } from "./types";
import { createContext, useReducer } from "react";

const ProductSliderContext = createContext<TContext | undefined>(undefined);

const ProductSliderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { selected: 0 });

  const selectImage = ({ index }: Pick<TPayload, "index">) => {
    dispatch({ type: "SELECT", payload: { index } });
  };

  const previousImage = ({ numberItems }: Pick<TPayload, "numberItems">) => {
    dispatch({ type: "PREVIOUS", payload: { numberItems } });
  };

  const nextImage = ({ numberItems }: Pick<TPayload, "numberItems">) => {
    dispatch({ type: "NEXT", payload: { numberItems } });
  };

  const value = {
    productSliderState: { ...state },
    selectImage,
    previousImage,
    nextImage,
  };
  return (
    <ProductSliderContext.Provider value={value}>
      {children}
    </ProductSliderContext.Provider>
  );
};

export { ProductSliderProvider, ProductSliderContext };
