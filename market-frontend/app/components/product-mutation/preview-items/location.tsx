import { Box } from "~/components/utilities";
import { useProductMutationContext } from "~/context/product-mutation";

export const Location = () => {
  const {
    productMutationState: { location },
  } = useProductMutationContext();

  return (
    <Box classes="text-xs tracking-wide">
      <span className="text-neutral-400 dark:text-neutral-50">
        Listed a few seconds ago {location?.name}
      </span>
    </Box>
  );
};
