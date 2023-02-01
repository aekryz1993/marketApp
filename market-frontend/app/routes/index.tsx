import type { LoaderFunction } from "@remix-run/node";
import { OrderBy } from "~/types/enums";

import { json } from "@remix-run/node";

import { TAKE, fetchProducts } from "~/endpoints/query/products";
import { ProductsLayout } from "~/components/products";
import { getAuthSession } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);
  const token = authSession.getToken();

  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const locationId = url.searchParams.get("locationId");

  const response = await fetchProducts(
    {
      pagination: { skip: 0, take: TAKE },
      orderBy: { createdAt: OrderBy.desc },
      search: search ?? undefined,
      filterBy: {
        locationId: locationId ? locationId : undefined,
      },
    },
    token
  );

  if (response.data?.products.statusCode === 200) {
    const { statusCode, ...data } = response.data.products;
    return json({ ...data, token });
  }

  throw new Error("Failed to retrieve products");
};

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
