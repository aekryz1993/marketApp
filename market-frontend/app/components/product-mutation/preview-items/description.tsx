import { Box } from "~/components/utilities";
import { useProductMutationContext } from "~/context/product-mutation";

export const Description = () => {
  const {
    productMutationState: { description },
  } = useProductMutationContext();

  return (
    <Box classes="pb-1">
      <h1 className="text-sm tracking-wide">{description ? <span>{description}</span> : <span className="text-neutral-400 dark:text-neutral-50">Description will appear here.</span>}</h1>
    </Box>
  );
};
