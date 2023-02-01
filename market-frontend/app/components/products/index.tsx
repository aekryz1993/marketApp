import type { TProductsLoaderData } from "~/types/data";

import { useLoaderData, useLocation, useParams } from "@remix-run/react";

import { MainLayout } from "./main-layout";
import { ProductsProvider } from "~/context/products";

export const ProductsLayout = () => {
  const data = useLoaderData<TProductsLoaderData>();
  const location = useLocation();
  const params = useParams();


  return (
    <>
      <ProductsProvider
        key={location.search.split("=")[1] ?? params?.category ?? ""}
        products={data.products}
      >
        <MainLayout />
      </ProductsProvider>
    </>
  );
};
