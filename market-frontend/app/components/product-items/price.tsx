import type { TCurrencyState } from "~/context/product-mutation/types";

import { Box } from "~/components/utilities";

export const Price = ({
  currency,
  price,
}: {
  currency: TCurrencyState;
  price: number | undefined;
}) => {
  return (
    <Box classes="tracking-wide">
      {price ? (
        <span>{`${price} ${currency.value}`}</span>
      ) : (
        <span className="text-neutral-400 dark:text-neutral-50">Price</span>
      )}
    </Box>
  );
};
