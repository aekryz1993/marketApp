import type { LoaderFunction } from "@remix-run/node";

import { useCatch } from "@remix-run/react";

import { ProductsLayout } from "~/components/products";
import { productsLoader } from "~/ssr/loaders/products.service";

export const loader: LoaderFunction = async ({ request, params }) =>
  productsLoader({ request, params });

export default function CategoryPage() {
  return <ProductsLayout />;
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
