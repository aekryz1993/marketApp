import { ProductLayout } from "~/product-layout";
import { PreviewImages } from "./preview-images";
import { PreviewItems } from "./preview-items";
import { ProductItemsLayout } from "~/product-layout/items-layout";

export const PreviewSection = () => {
  return (
    <ProductLayout>
      <PreviewImages />
      <ProductItemsLayout>
        <PreviewItems />
      </ProductItemsLayout>
    </ProductLayout>
  );
};
