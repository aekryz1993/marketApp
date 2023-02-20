import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { useCatch } from "@remix-run/react";

import { Product } from "~/components/product";
import { sendMessageFromBuyerAction } from "~/ssr/actions/send-message-buyer.service";
import { productLoader } from "~/ssr/loaders/product.service";

export const loader: LoaderFunction = async ({ params }) =>
  productLoader({ params });

export const action: ActionFunction = async ({ request, params }) =>
  sendMessageFromBuyerAction({ request, params });

export default function ProductPage() {
  return <Product />;
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

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
