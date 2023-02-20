import type { TRootLoaderData } from "~/types/data";

import { useOutletContext } from "@remix-run/react";

import { MainLayout } from "./main-layout";
import { ProductsProvider } from "~/context/products";
import { Loader } from "../loader";
import { useProductsKey } from "./useProductsKey";

export const ProductsLayout = () => {
  const { authInfo } = useOutletContext<Pick<TRootLoaderData, "authInfo">>();
  const { key, loadingCondition } = useProductsKey(authInfo?.token);

  return (
    <ProductsProvider key={key ?? ""}>
      {loadingCondition ? <Loader dimensions="w-40 h-40" /> : <MainLayout />}
    </ProductsProvider>
  );
};
