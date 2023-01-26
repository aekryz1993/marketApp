import type { LoaderFunction } from "@remix-run/node";
import { OrderBy } from "~/types/enums";

import { json } from "@remix-run/node";

import { TAKE, fetchProducts } from "~/endpoints/query/products";
import { ProductsLayout } from "~/components/products";
import { getAuthSession } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const authSession = await getAuthSession(request);
    const token = authSession.getToken();

    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    const response = await fetchProducts(
      {
        pagination: { skip: 0, take: TAKE },
        orderBy: { createdAt: OrderBy.desc },
        search: search ?? undefined,
      },
      token
    );

    if (response.data?.products.statusCode === 200) {
      const { statusCode, ...data } = response.data.products;
      return json({ ...data, token });
    }
  } catch (error: any) {
    return json({ error: error.message });
  }
};

export default function Index() {
  return <ProductsLayout />;
}
