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
    <div className="flex h-[calc(100%-56px)] w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-black tracking-wide antialiased">
        {caught.status} {caught.statusText}
      </h1>
    </div>
  );
}
