import type { LoaderFunction } from "@remix-run/node";

import { Selling } from "~/components/selling";
import { ProductsProvider } from "~/context/products";
import { productsLoader } from "~/ssr/loaders/products.service";

export const loader: LoaderFunction = async ({ request }) =>
  productsLoader({ request, isSellerProducts: true });

export default function SellingPage() {
  return (
    <ProductsProvider>
      <Selling />
    </ProductsProvider>
  );
}
