import { memo } from "react";
import { Box } from "~/components/utilities";

export const Description = memo(
  ({ description }: { description: string | null | undefined }) => {
    return (
      <Box classes="pb-1">
        <h1 className="text-sm tracking-wide">
          {description ? (
            <span>{description}</span>
          ) : (
            <span className="text-neutral-400 dark:text-neutral-50">
              Description will appear here.
            </span>
          )}
        </h1>
      </Box>
    );
  }
);

Description.displayName = "Description";
