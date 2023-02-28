import type { TRootLoaderData } from "~/types/data";

import { useOutletContext } from "@remix-run/react";

import { ProductMutation } from "~/components/product-mutation";
import { NotAuthorizedPage } from "~/components/not-authorized-page";

export default function CreateProduct() {
  const { authInfo } = useOutletContext<TRootLoaderData>();

  if (!authInfo) return <NotAuthorizedPage />;

  return <ProductMutation />;
}
