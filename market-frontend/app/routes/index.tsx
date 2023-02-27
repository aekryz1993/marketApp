import type { LoaderFunction, ActionFunction } from "@remix-run/node";

import { ProductsLayout } from "~/components/products";
import { authAction } from "~/ssr/actions/auth.service";
import { productsLoader } from "~/ssr/loaders/products.service";

export const loader: LoaderFunction = async ({ request }) =>
  productsLoader({ request });

export const action: ActionFunction = async ({ request }) =>
  authAction({ request });

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
