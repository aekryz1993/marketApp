import { useLocation, useTransition } from "@remix-run/react";

import { MainLayout } from "./main-layout";
import { ProductsProvider } from "~/context/products";
import { Loader } from "../loader";

export const ProductsLayout = () => {
  const location = useLocation();
  const transition = useTransition();

  const currentKey = `${location.pathname}${location.search.slice(1)}`;
  const nextKey = `${
    transition.location?.pathname
  }${transition.location?.search.slice(1)}`;

  const loadingCondition =
    transition.state !== "idle" && currentKey !== nextKey;

  return (
    <>
      <ProductsProvider key={nextKey ?? ""}>
        {loadingCondition ? <Loader dimensions="w-40 h-40" /> : <MainLayout />}
      </ProductsProvider>
    </>
  );
};
