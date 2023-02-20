import type { TLocation } from "~/types/endpoints/product";

import { Box } from "~/components/utilities";

export const Location = ({ location }: { location?: TLocation }) => {
  return (
    <Box classes="text-xs tracking-wide">
      <span className="text-neutral-400 dark:text-neutral-50">
        Listed a few seconds ago {location?.name}
      </span>
    </Box>
  );
};
