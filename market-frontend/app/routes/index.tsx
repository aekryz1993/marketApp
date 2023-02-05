import type { LoaderFunction } from "@remix-run/node";

import { ProductsLayout } from "~/components/products";
import { productsLoader } from "~/ssr/loaders/products.service";

export const loader: LoaderFunction = async ({ request }) =>
productsLoader({ request });

export default function Index() {
  return <ProductsLayout />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
