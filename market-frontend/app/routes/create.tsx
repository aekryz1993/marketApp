import type { ActionFunction } from "@remix-run/node";
import type { TRootLoaderData } from "~/types/data";

import { unstable_parseMultipartFormData } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";

import { createProductAction } from "~/ssr/actions/create-product.server";
import { ProductMutation } from "~/components/product-mutation";
import { authAction } from "~/ssr/actions/auth.service";
import { uploadImagesHandler } from "~/utils/product.server";
import { NotAuthorizedPage } from "~/components/not-authorized-page";

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadImagesHandler()
  );
  const authType = formData.get("authType");
  if (typeof authType === "string") return authAction({ request, formData });
  return createProductAction({ request, formData });
};

export default function CreateProduct() {
  const { authInfo } = useOutletContext<TRootLoaderData>();

  if (!authInfo) return <NotAuthorizedPage />;

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
