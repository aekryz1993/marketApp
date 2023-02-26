import type { LoaderArgs } from "@remix-run/node";
import { OrderBy, Category } from "~/types/enums";

import { json } from "@remix-run/node";

import { TAKE, fetchProducts } from "~/endpoints/query/products";
import { getAuthSession } from "~/utils/auth.server";
import { categories } from "~/utils/helpers";

export const productsLoader = async ({
  request,
  params,
  isSellerProducts
}: Pick<LoaderArgs, "request"> & Partial<Pick<LoaderArgs, "params">> & { isSellerProducts?: boolean }) => {
  try {
    const authSession = await getAuthSession(request);
    const token = authSession.getToken();

    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const locationId = url.searchParams.get("locationId");

    const formData = new FormData()
    const ownProducts = isSellerProducts ?? await formData.get('ownProducts');

    if (!params || search) {
      const response = await fetchProducts(
        {
          pagination: { skip: 0, take: TAKE },
          orderBy: { createdAt: OrderBy.desc },
          search: search ?? undefined,
          filterBy: {
            locationId: locationId ? locationId : undefined,
            ownProducts: (typeof ownProducts === 'boolean' && ownProducts) || ((typeof ownProducts === "string" && ownProducts === 'true') ? true : false)
          },
        },
        token
      );



      if (response.data?.products.statusCode === 200) {
        const { statusCode, ...data } = response.data.products;
        return json({ ...data, token });
      }
      throw new Error("Failed to retrieve products");
    }

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
        filterBy: {
          category: categoryName,
          locationId: locationId ? locationId : undefined,
          ownProducts: (typeof ownProducts === "string" && ownProducts === 'true') ? true : false
        },
      },
      token
    );

    if (response.data?.products.statusCode === 200) {
      const { statusCode, ...data } = response.data.products;
      return json({ ...data, categoryName });
    }
  } catch (error: any) {
    return json({ error: error.message });
  }
};
