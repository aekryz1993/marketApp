import { PreviewImages } from "./preview-images";
import { ProductItems } from "../product-items";
import { useProductMutationContext } from "~/context/product-mutation";
import { ProductLayout } from "../product-layout";
import { ProductItemsLayout } from "../product-layout/items-layout";

export const PreviewSection = () => {
  const { productMutationState } = useProductMutationContext();

  return (
    <ProductLayout layoutType="Preview">
      <PreviewImages />
      <ProductItemsLayout>
        <ProductItems product={productMutationState} />
      </ProductItemsLayout>
    </ProductLayout>
  );
};
