import { Box } from "~/components/utilities";
import { useProductMutationContext } from "~/context/product-mutation";

export const Title = () => {
  const {
    productMutationState: { title, brand },
  } = useProductMutationContext();

  return (
    <Box>
      <h1 className="text-2xl font-semibold tracking-wide">
        {title || brand ? (
          <span>
            {title}
            {!!brand && title ? `, ${brand}` : brand}
          </span>
        ) : (
          <span className="text-neutral-400 dark:text-neutral-50">Title</span>
        )}
      </h1>
    </Box>
  );
};
