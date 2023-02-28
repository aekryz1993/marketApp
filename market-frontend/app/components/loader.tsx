import clsx from "clsx";

import { Box } from "./utilities";

export const Loader = ({ dimensions }: { dimensions: string }) => (
  <Box classes="w-full flex justify-center items-center py-2">
    <div
      className={clsx(
        dimensions,
        "animate-spin rounded-full border border-l-4 border-l-btn-light-pry dark:border-l-btn-dark-pry"
      )}
    />
  </Box>
);
