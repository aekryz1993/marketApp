import type { ActionFunction } from "@remix-run/node";

import { createProductAction } from "~/ssr/actions/create-product.server";
import { ProductMutation } from "~/components/product-mutation";

export const action: ActionFunction = async ({ request }) =>
  createProductAction({ request });

export default function CreateProduct() {
  return <ProductMutation />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
