import { useContext } from "react";

import { ProductSliderContext } from "./provider";

export { ProductSliderProvider } from "./provider";

export const useProductSliderContext = () => {
  const context = useContext(ProductSliderContext);

  if (typeof context === "undefined")
    throw new Error(
      "useProductSliderContext must be used within the ProductSliderProvider"
    );

  return context;
};
