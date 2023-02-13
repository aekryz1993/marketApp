import { useContext } from "react";

import { ProductMutationContext } from "./provider";

export { ProductMutationProvider } from "./provider";

export const useProductMutationContext = () => {
  const context = useContext(ProductMutationContext);

  if (typeof context === "undefined")
    throw new Error(
      "useProductMutationContext must be used within the ProductMutationProvider"
    );

  return context;
};
