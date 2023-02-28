import type { LoaderFunction } from "@remix-run/node";

import { useCatch } from "@remix-run/react";

import { ProductsLayout } from "~/components/products";
import { productsLoader } from "~/ssr/loaders/products.service";

export const loader: LoaderFunction = async ({ request }) =>
  productsLoader({ request });

export default function Index() {
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

