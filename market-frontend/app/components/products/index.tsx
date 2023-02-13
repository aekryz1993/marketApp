import type { TRootLoaderData } from "~/types/data";

import { useOutletContext } from "@remix-run/react";

import { MainLayout } from "./main-layout";
import { ProductsProvider } from "~/context/products";
import { Loader } from "../loader";
import { useBreakPointsContext } from "~/context/breakPoint";
import { Sidebar } from "../sidebar";
import { Auth } from "../auth";
import { useProductsKey } from "./useProductsKey";

export const ProductsLayout = () => {
  const { authInfo } = useOutletContext<Pick<TRootLoaderData, "authInfo">>();
  const breakPoint = useBreakPointsContext();
  const { key, loadingCondition } = useProductsKey(authInfo?.token);

  return (
    <>
      {!breakPoint?.windowWidth ? (
        <div className="absolute top-[9999px]">
          <ProductsProvider key={key ?? ""}>
            <MainLayout />
          </ProductsProvider>
        </div>
      ) : (
        <>
          <Sidebar sizeW={breakPoint?.windowWidth} />
          <ProductsProvider key={key ?? ""}>
            {loadingCondition ? (
              <Loader dimensions="w-40 h-40" />
            ) : (
              <MainLayout />
            )}
          </ProductsProvider>
          {location.pathname !== "/" && <Auth />}
        </>
      )}
    </>
  );
};
