import clsx from "clsx";
import { useProductMutationContext } from "~/context/product-mutation";

export const DetailHeader = () => {
  const {
    productMutationState: { condition, tags, location },
  } = useProductMutationContext();

  const isDisplay =
    condition.key !== "NOT_SELECTED" || tags.length > 0 || !!location;

  return (
    <h1
      className={clsx(
        "pt-6 pb-3 text-lg font-semibold tracking-wide",
        isDisplay ? null : "text-neutral-400 dark:text-neutral-50"
      )}
    >
      Detail
    </h1>
  );
};
