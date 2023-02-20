import type { TProduct } from "~/types/endpoints/product";
import type { TProductProp } from "../product-items";
import type { TRootLoaderData } from "~/types/data";
import type { ConditionKey } from "~/types/enums";

import { ProductLayout } from "../product-layout";
import { ProductItemsLayout } from "../product-layout/items-layout";
import { ProductImagesSlider } from "../product-images-slider";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { ProductItems } from "../product-items";
import { Condition, Currency } from "~/types/enums";
import { CurrencySymbol } from "~/types/enums";

export const Product = () => {
  const { product } = useLoaderData<{ product: TProduct }>();
  const { authInfo } = useOutletContext<Pick<TRootLoaderData, "authInfo">>();

  const currency = authInfo?.user?.currency ?? Currency.DZD;

  const price = product.currentPrice.find(
    (price) => price.currency === currency
  );

  const conditionKey = Object.keys(Condition)[
    Object.values(Condition).indexOf(product.condition)
  ] as ConditionKey;

  const productItems: TProductProp = {
    title: product.title,
    brand: product.brand,
    description: product.description,
    location: product.location,
    condition: { key: conditionKey, value: product.condition },
    currentPrice: price?.amount,
    currency: { key: currency, value: CurrencySymbol[currency] },
    tags: product.tags.map((tag) => tag.text),
    owner: product.owner
  };

  return (
    <ProductLayout>
      <ProductImagesSlider images={product.images} />
      <ProductItemsLayout>
        <ProductItems product={productItems} />
      </ProductItemsLayout>
    </ProductLayout>
  );
};
