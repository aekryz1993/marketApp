import type { LoaderFunction } from "@remix-run/node";
import type { TProductsLoaderData } from "~/types/data";
import { OrderBy, Category } from "~/types/enums";

import { json, redirect } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { ProductsProvider } from "~/context/products";

import { TAKE, fetchProducts } from "~/endpoints/query/products";
import { ProductsLayout } from "~/components/products";
import { getAuthSession } from "~/utils/auth.server";
import { categories } from "~/utils/helpers";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const authSession = await getAuthSession(request);
    const token = authSession.getToken();

    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    if (search) return redirect(`/?search=${search}`);

    const category = categories.find(
      (category) => category.pathname === params.category
    );

    const categoryName: Category = category?.name || Category.NOT_FOUND;

    if (categoryName === Category.NOT_FOUND) {
      throw new Error("Page not found.");
    }

    const response = await fetchProducts(
      {
        pagination: { skip: 0, take: TAKE },
        orderBy: { createdAt: OrderBy.desc },
        filterBy: { category: categoryName },
      },
      token
    );

    if (response.data?.products.statusCode === 200) {
      const { statusCode, ...data } = response.data.products;
      return json({ ...data, token, categoryName });
    }
  } catch (error: any) {
    return json({ error: error.message });
  }
};

export default function CategoryPage() {
  const data = useLoaderData<TProductsLoaderData>();
  const params = useParams()

  return (
    <ProductsProvider key={params.category ?? ""} products={data.products}>
      <ProductsLayout />
    </ProductsProvider>
  );
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
