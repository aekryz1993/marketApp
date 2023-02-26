import clsx from "clsx";

import { Box } from "~/components/utilities";

export const Message = ({
  messageText,
  isSender,
}: {
  messageText: string;
  isSender: boolean;
}) => {
  return (
    <Box
      classes={clsx(
        "px-4 py-2 rounded-3xl w-full bg-bg-sel_lt max-w-[200px] dark:bg-bg-sel_dark",
        isSender ? "self-end mr-6" : "float-start ml-2"
      )}
    >
      <span className="whitespace-pre-wrap break-words text-white">
        {messageText}
      </span>
    </Box>
  );
};
