import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import type { TRootLoaderData } from "~/types/data";

import { useOutletContext } from "@remix-run/react";

import { Selling } from "~/components/selling";
import { ProductsProvider } from "~/context/products";
import { productsLoader } from "~/ssr/loaders/products.service";
import { NotAuthorizedPage } from "~/components/not-authorized-page";
import { authAction } from "~/ssr/actions/auth.service";

export const loader: LoaderFunction = async ({ request }) =>
  productsLoader({ request, isSellerProducts: true });

export const action: ActionFunction = async ({ request }) =>
  authAction({ request });

export default function SellingPage() {
  const { authInfo } = useOutletContext<TRootLoaderData>();

  if (!authInfo) return <NotAuthorizedPage />;

  return (
    <ProductsProvider>
      <Selling />
    </ProductsProvider>
  );
}
