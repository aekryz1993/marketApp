import type { LoaderFunction } from "@remix-run/node";

import { Product } from "~/components/product";
import { productLoader } from "~/ssr/loaders/product.service";

export const loader: LoaderFunction = async ({ params }) =>
  productLoader({ params });

export default function ProductPage() {
  return <Product />;
}
