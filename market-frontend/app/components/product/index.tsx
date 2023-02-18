import type { TProduct } from "~/types/endpoints/product"

import { ProductLayout } from "~/product-layout"
import { ProductItemsLayout } from "~/product-layout/items-layout"
import { ProductImagesSlider } from "../product-images-slider"
import { useLoaderData } from "@remix-run/react"

export const Product = () => {
  const {product} = useLoaderData<{product: TProduct}>()


  return  <ProductLayout>
    <ProductImagesSlider images={product.images} />
    <ProductItemsLayout>
      {/* <PreviewItems /> */}
    </ProductItemsLayout>
  </ProductLayout>
}