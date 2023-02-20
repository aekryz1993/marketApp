import type { TLocation } from "~/types/endpoints/product";
import type { TConditionState } from "~/context/product-mutation/types";

import clsx from "clsx";

export const DetailHeader = ({
  condition,
  tags,
  location,
  brand,
}: {
  condition: TConditionState;
  tags: string[];
  location?: TLocation;
  brand: string | null | undefined;
}) => {
  const isDisplay =
    condition.key !== "NOT_SELECTED" ||
    tags.length > 0 ||
    !!location ||
    !!brand;

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
