import type { TProduct } from "~/types/endpoints/product";

import { Card } from "../utilities/card";
import { Box } from "../utilities";
import { figureCaptionClasses } from "../utilities/card/styled";
import {
  productLocationClasses,
  productPriceClasses,
  productTitleClasses,
} from "./styles";

export const ProductItem = ({
  product,
  itemWidth,
}: {
  product: TProduct;
  itemWidth: { width: string };
}) => {
  return (
    <Card itemwidth={itemWidth}>
      <img
        src={product.images[0].src.square}
        alt={product.images[0].alt}
        className="h-auto w-full overflow-x-hidden rounded-lg object-cover"
      />
      <figcaption className={figureCaptionClasses}>
        <Box>
          <p className={productPriceClasses}>
            {product.currentPrice[0].formattedAmount}
          </p>
        </Box>
        <Box>
          <p className={productTitleClasses}>{product.title}</p>
        </Box>
        <Box>
          <p className={productLocationClasses}>{product.location?.name}</p>
        </Box>
      </figcaption>
    </Card>
  );
};
