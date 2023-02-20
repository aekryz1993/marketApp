import { Box } from "~/components/utilities";

export const Title = ({ title }: { title: string }) => {
  return (
    <Box>
      <h1 className="text-2xl font-semibold tracking-wide">
        {title ? (
          <span>{title}</span>
        ) : (
          <span className="text-neutral-400 dark:text-neutral-50">Title</span>
        )}
      </h1>
    </Box>
  );
};
