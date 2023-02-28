import type { TRootLoaderData } from "~/types/data";
import type { ActionFunction } from "@remix-run/node";

import { useCatch, useOutletContext } from "@remix-run/react";

import { ProductMutation } from "~/components/product-mutation";
import { NotAuthorizedPage } from "~/components/not-authorized-page";
import { createProductAction } from "~/ssr/actions/create-product.server";

export const action: ActionFunction = async ({ request }) =>
  createProductAction({ request });

export default function CreateProduct() {
  const { authInfo } = useOutletContext<TRootLoaderData>();

  if (!authInfo) return <NotAuthorizedPage />;

  return <ProductMutation />;
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
