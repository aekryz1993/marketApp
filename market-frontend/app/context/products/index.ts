import { useContext } from "react";

import { ProductsContext } from "./provider";

export { ProductsProvider } from "./provider";

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (typeof context === "undefined")
    throw new Error("useProducts must be used within the ProductsProvider");

  return context;
};
