import type { LoaderFunction } from "@remix-run/node";
import type { TRootLoaderData } from "~/types/data";

import { useCatch, useOutletContext } from "@remix-run/react";

import { Selling } from "~/components/selling";
import { ProductsProvider } from "~/context/products";
import { productsLoader } from "~/ssr/loaders/products.service";
import { NotAuthorizedPage } from "~/components/not-authorized-page";

export const loader: LoaderFunction = async ({ request }) =>
  productsLoader({ request, isSellerProducts: true });

export default function SellingPage() {
  const { authInfo } = useOutletContext<TRootLoaderData>();

  if (!authInfo) return <NotAuthorizedPage />;

  return (
    <ProductsProvider>
      <Selling />
    </ProductsProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
    </div>
  );
}
