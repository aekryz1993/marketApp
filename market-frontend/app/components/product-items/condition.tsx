import type { TConditionState } from "~/context/product-mutation/types";

import { Box } from "~/components/utilities";

export const Condition = ({condition}: {condition: TConditionState}) => {
  return (
    <>
      {condition.key !== "NOT_SELECTED" && (
        <Box classes="flex items-center w-full min-h-0 pb-3 text-sm">
          <div className="flex-1 grow shrink text-start">
            <span className="font-bold">Condition</span>
          </div>
          <div className="flex-1 grow shrink text-start">
            <span>{condition.value}</span>
          </div>
        </Box>
      )}
    </>
  );
};
