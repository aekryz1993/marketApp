import type { TRootLoaderData } from "~/types/data";

import { useLocation, useTransition, useOutletContext } from "@remix-run/react";

import { MainLayout } from "./main-layout";
import { ProductsProvider } from "~/context/products";
import { Loader } from "../loader";
import { useBreakPointsContext } from "~/context/breakPoint";
import { Sidebar } from "../sidebar";
import { Auth } from "../auth";

export const ProductsLayout = () => {
  const { authInfo } = useOutletContext<Pick<TRootLoaderData, "authInfo">>();
  const breakPoint = useBreakPointsContext();

  const location = useLocation();
  const transition = useTransition();

  const currentKey = `${location.pathname}${location.search.slice(1)}`;
  const nextKey = `${
    transition.location?.pathname
  }${transition.location?.search.slice(1)}`;

  const loadingCondition =
    transition.state !== "idle" && currentKey !== nextKey;

  const key = authInfo?.token ? authInfo?.token + nextKey : nextKey;

  return (
    <>
      {!breakPoint ? (
        <Loader dimensions="w-28 h-28" />
      ) : (
        <>
          <Sidebar sizeW={breakPoint.windowWidth} />
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
