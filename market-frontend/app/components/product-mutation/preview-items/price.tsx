import { Box } from "~/components/utilities";
import { useProductMutationContext } from "~/context/product-mutation";

export const Price = () => {
  const {
    productMutationState: { currency, currentPrice },
  } = useProductMutationContext();

  return (
    <Box classes="tracking-wide">
      {currentPrice ? (
        <span>{`${currentPrice} ${currency.value}`}</span>
      ) : (
        <span className="text-neutral-400 dark:text-neutral-50">Price</span>
      )}
    </Box>
  );
};
